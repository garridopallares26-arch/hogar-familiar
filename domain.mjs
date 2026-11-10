export const day=d=>{const x=new Date(d);return `${x.getFullYear()}-${String(x.getMonth()+1).padStart(2,'0')}-${String(x.getDate()).padStart(2,'0')}`};
export const today=()=>day(new Date());
export function shiftMonth(date,n){const [y,m,d]=date.split('-').map(Number);const a=new Date(y,m-1+n,1);a.setDate(Math.min(d,new Date(a.getFullYear(),a.getMonth()+1,0).getDate()));return day(a)}
export function nextDue(r,base=today()){let d=r.date;const n=Number(r.frequency);if(!d)return '';if(!n)return d;let limit=0;while(d<base&&limit++<2400)d=shiftMonth(r.date, n*limit);return d}
export function amountAt(r,date=today()){const changes=[...(r.amountChanges||[])].sort((a,b)=>a.from.localeCompare(b.from));let value=Number(r.amount);for(const c of changes){if(c.from<=date)value=Number(c.amount);}return value}
export const monthly=(r,base=today())=>r.archived||!Number(r.frequency)||(r.startDate||r.date)>base?0:amountAt(r,base)/Number(r.frequency);
export function expensesOn(r,month){if(r.archived)return [];let d=nextDue(r,month+'-01');let out=[];for(let i=0;d&&d.startsWith(month)&&i<32;i++){out.push(d);if(!Number(r.frequency))break;d=shiftMonth(r.date,Number(r.frequency)*(i+1));while(d<=out.at(-1))d=shiftMonth(d,Number(r.frequency));}return out}
export function openITV(state,base=today(),id=()=>crypto.randomUUID()){for(const v of state.vehicles.filter(v=>!v.archived&&v.date)){if(shiftMonth(v.date,-1)<=base&&!state.activities.some(a=>a.vehicle===v.id&&a.due===v.date)){state.activities.push({id:id(),title:'ITV · '+v.vehicle,type:'Vehículos',status:'Pedir cita ITV',vehicle:v.id,due:v.date,closed:false,appointments:[],contacts:[],notes:[],files:[]});}}}
export function addDays(date,n){const d=new Date(date+'T12:00:00');d.setDate(d.getDate()+n);return day(d)}
export function chargesBetween(rows,start,end){const out=[];for(const r of rows.filter(r=>!r.archived)){let m=start.slice(0,7);while(m<=end.slice(0,7)){for(const d of expensesOn(r,m))if(d>=start&&d<=end)out.push({record:r,date:d,amount:amountAt(r,d)});m=shiftMonth(m+'-01',1).slice(0,7)}}return out.sort((a,b)=>a.date.localeCompare(b.date))}
export const activityTypes=['Casa','Salud','Vehículos','Mascotas','Gestiones','Personal y familia'];
export function inferType(a){if(a.vehicle)return 'Vehículos';const s=a.title.toLowerCase();if(/perro|gato|veterin|vacun/.test(s))return 'Mascotas';if(/médic|dental|dentista|prueba médica|salud/.test(s))return 'Salud';if(/itv|coche|vehículo|moto/.test(s))return 'Vehículos';if(/obra|reforma|baño|pint|fuga|ventana|caldera|lavadora|terraza|llaves|mesa|router|persiana/.test(s))return 'Casa';if(/comunidad|gestor|document|banco|depósito/.test(s))return 'Gestiones';return 'Personal y familia'}
export function migrate(s){s.trash??=[];for(const a of s.activities){a.type??=inferType(a);for(const k of ['appointments','contacts','notes','files'])a[k]??=[]}for(const r of s.fixed)r.startDate??=r.date;return s}
export function validDate(s){return /^\d{4}-\d{2}-\d{2}$/.test(s)&&Number.isFinite(new Date(s+'T12:00:00').getTime())&&day(new Date(s+'T12:00:00'))===s}
export function validateState(s){
 if(!s||typeof s!=='object'||Array.isArray(s))throw Error('La copia no tiene un formato válido.');
 const keys=['capital','fixed','extra','insurance','vehicles','activities','history'];
 const text=(r,k,required=false)=>{if(r[k]!==undefined&&typeof r[k]!=='string')throw Error('Texto inválido: '+k);if(required&&!r[k]?.trim())throw Error('Falta un dato obligatorio: '+k)};
 const money=v=>{if(v===''||v===null||!['number','string'].includes(typeof v)||!Number.isFinite(Number(v))||Number(v)<0)throw Error('Hay un importe inválido.')};
 const d=(v,required=false)=>{if((required||v)&&!validDate(v))throw Error('Hay una fecha inválida.')};
 const file=f=>{if(!f||typeof f.name!=='string'||typeof f.data!=='string'||!/^data:[^,]*;base64,[A-Za-z0-9+/=]*$/.test(f.data)||f.data.length>1450000)throw Error('Hay un archivo inválido o demasiado grande.')};
 const allIds=new Set();
 for(const k of keys){if(!Array.isArray(s[k])||s[k].length>10000)throw Error('Lista inválida: '+k);for(const r of s[k]){
  if(!r||typeof r!=='object'||Array.isArray(r))throw Error('Registro inválido.');
  if(k==='history'){d(r.date,true);money(r.total);continue}
  text(r,'id',true);if(allIds.has(r.id))throw Error('Hay identificadores repetidos.');allIds.add(r.id);
  if(r.archived!==undefined&&typeof r.archived!=='boolean')throw Error('Estado de archivo inválido.');
  for(const f of ['title','status','comment','entity','level1','level2','account','category','method','policy','insured','contact','phone','vehicle','plate','activity','fixed','capital','due','type','startDate','updated'])text(r,f);
  if(r.approx!==undefined&&typeof r.approx!=='boolean')throw Error('La marca de fecha aproximada no es válida.');
  if(['capital','fixed','extra'].includes(k))money(r.amount);
  if(k==='capital'){text(r,'level1',true);text(r,'level2',true);text(r,'entity',true);d(r.updated)}
  if(k==='fixed'){text(r,'title',true);d(r.date,true);d(r.startDate);if(![0,1,3,6,12].includes(Number(r.frequency)))throw Error('Frecuencia inválida.');if(r.amountChanges!==undefined&&!Array.isArray(r.amountChanges))throw Error('Cambios de importe inválidos.');for(const c of r.amountChanges||[]){d(c.from,true);money(c.amount)}}
  if(k==='extra'){text(r,'title',true);if(!['Previsto','Efectuado'].includes(r.status))throw Error('Estado de gasto inválido.');d(r.date)}
  if(k==='insurance'){text(r,'insured',true);text(r,'entity',true)}
  if(k==='vehicles'){text(r,'vehicle',true);text(r,'plate',true);d(r.date,true)}
  if(r.files!==undefined){if(!Array.isArray(r.files))throw Error('Adjuntos inválidos.');r.files.forEach(file)}
  if(k==='activities'){text(r,'title',true);if(r.closed!==undefined&&typeof r.closed!=='boolean')throw Error('Estado de actividad inválido.');if(r.type&&!activityTypes.includes(r.type))throw Error('Tipo de actividad inválido.');for(const key of ['appointments','contacts','notes']){if(r[key]!==undefined&&!Array.isArray(r[key]))throw Error('Datos de actividad inválidos.');const ids=new Set();for(const c of r[key]||[]){if(!c||typeof c!=='object')throw Error('Detalle inválido.');text(c,'id',true);if(ids.has(c.id))throw Error('Detalle duplicado.');ids.add(c.id);if(key==='appointments'){d(c.date,true);text(c,'time',true);if(!/^([01]\d|2[0-3]):[0-5]\d$/.test(c.time))throw Error('Hora inválida.');text(c,'title');text(c,'place')}if(key==='contacts'){text(c,'name',true);text(c,'phone')}if(key==='notes'){text(c,'text',true);d(c.date,true)}}}}
 }}
 if(s.trash!==undefined&&(!Array.isArray(s.trash)||s.trash.length>10000))throw Error('Papelera inválida.');
 const trashIds=new Set();for(const t of s.trash||[]){if(!t||typeof t!=='object'||!['extra','appointments','contacts','notes','file'].includes(t.kind)||!t.value||typeof t.value!=='object')throw Error('Elemento retirado inválido.');text(t,'id',true);text(t,'label',true);text(t,'parent');d(t.date,true);if(trashIds.has(t.id))throw Error('Elemento retirado repetido.');trashIds.add(t.id);if(t.kind==='file'){file(t.value);if(!['insurance','activities'].includes(t.collection)||!s[t.collection].some(r=>r.id===t.parent))throw Error('Destino de archivo inválido.')}else{const probe=JSON.parse(JSON.stringify(s));probe.trash=[];if(t.kind==='extra')probe.extra.push(t.value);else{const a=probe.activities.find(a=>a.id===t.parent);if(!a)throw Error('Destino de elemento retirado inválido.');a[t.kind]??=[];a[t.kind].push(t.value)}validateState(probe)}}
 const ids=k=>new Set(s[k].map(r=>r.id));for(const r of s.fixed)if(r.account&&!ids('capital').has(r.account))throw Error('Una cuenta vinculada no existe.');for(const r of s.extra)if(r.activity&&!ids('activities').has(r.activity))throw Error('Una actividad vinculada no existe.');for(const r of s.insurance){if(r.fixed&&!ids('fixed').has(r.fixed))throw Error('Un gasto vinculado no existe.');if(r.capital&&!ids('capital').has(r.capital))throw Error('Un capital vinculado no existe.')}return true;
}
