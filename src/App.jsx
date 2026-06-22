import React, { useMemo, useState } from 'react';
import { AnimatePresence, motion } from 'framer-motion';
import { Search, Filter, BookOpen, GitBranch, X, ChevronRight, Presentation } from 'lucide-react';

const sp = (scientific, common = '', endemic = false, status = '') => ({ scientific, common, endemic, status });

const suborders = [
  {
    name: 'Pleurodira',
    common: 'tortugas de cuello lateral',
    color: '#22c55e',
    description: 'Tortugas que doblan el cuello dentro del caparazón. En el esquema del PDF se relacionan con Chelidae, Podocnemididae y Testudinidae.',
    families: [
      {
        name: 'Chelidae',
        common: 'tortugas de cuello lateral',
        count: '6 especies, 0 endémicas',
        traits: ['Tortugas acuáticas y semiacuáticas.', 'Habitan principalmente el trópico oriental.', 'Pueden vivir en agua dulce y algunas rara vez salen a tierra.', 'En la matamata el hocico tiene forma de trompa con los orificios nasales en el extremo.', 'Presentan coloración castaño verdosa uniforme en especies representativas.', 'Algunas especies poseen excrescencias cutáneas.'],
        species: [sp('Chelus fimbriatus','matamata'), sp('Phrynops geoffroanus','tortuga cabeza de sapo de Geoffroy'), sp('Mesoclemmys gibba','tortuga de Gibba'), sp('Mesoclemmys heliostemma','tortuga cabeza de sapo'), sp('Mesoclemmys raniceps','tortuga cabeza de sapo de líneas negras'), sp('Peltocephalus dumerilianus','tortuga de cabeza grande'), sp('Platemys platycephala','charapita de aguajal')]
      },
      {
        name: 'Podocnemididae',
        common: 'tortugas pleurodiras afroamericanas',
        count: '3 especies en el país',
        traits: ['Caparazón relativamente aplanado.', 'Membranas natatorias interdigitales.', 'Presencia de uno a dos apéndices filiformes y carnosos debajo de la mandíbula inferior.', 'Especies acuáticas y semiacuáticas.', 'La cabeza suele tener marcas amarillas, naranjas o rojas.', 'La hembra deposita de 20 a 40 huevos.', 'Son cazadas por sus huevos, carne y sangre.'],
        species: [sp('Podocnemis expansa','charapa grande'), sp('Podocnemis unifilis','charapa pequeña')]
      },
      {
        name: 'Testudinidae',
        common: 'tortugas terrestres',
        count: '15 especies de Galápagos, 14 endémicas',
        traits: ['Tortugas terrestres típicas.', 'Caparazón muy convexo, alto y abombado.', 'Patas traseras columnares y patas delanteras algo aplanadas.', 'Pueden flotar por mucho tiempo, pero no pueden nadar.', 'En Galápagos se registran tortugas gigantes con alto endemismo.', 'El PDF registra 15 especies de tortugas de Galápagos y 14 endémicas.'],
        species: [sp('Chelonoidis abingdonii','tortuga gigante de Pinta',true,'Extinta'), sp('Chelonoidis becki','tortuga gigante del volcán Wolf',true,'Vulnerable'), sp('Chelonoidis chathamensis','tortuga gigante de San Cristóbal',true,'En peligro'), sp('Chelonoidis darwini','tortuga gigante de Santiago',true,'Peligro crítico'), sp('Chelonoidis denticulatus','motelo',false,'Vulnerable'), sp('Chelonoidis donfaustoi','tortuga gigante de Don Fausto',true,'Peligro crítico'), sp('Chelonoidis duncanensis','tortuga gigante de Pinzón',true,'Vulnerable'), sp('Chelonoidis guntheri','tortuga gigante de Sierra Negra',true,'Peligro crítico'), sp('Chelonoidis hoodensis','tortuga gigante de Española',true,'Peligro crítico'), sp('Chelonoidis microphyes','tortuga gigante de Darwin',true,'En peligro'), sp('Chelonoidis niger','tortuga gigante de Floreana',true,'Extinta'), sp('Chelonoidis phantasticus','tortuga gigante de Fernandina',true,'Peligro crítico'), sp('Chelonoidis porteri','tortuga gigante de Santa Cruz',true,'Peligro crítico'), sp('Chelonoidis vandenburghi','tortuga gigante de Alcedo',true,'Vulnerable'), sp('Chelonoidis vicina','tortuga gigante de Cerro Azul',true,'En peligro')]
      }
    ]
  },
  {
    name: 'Cryptodira',
    common: 'tortugas que retraen el cuello en S',
    color: '#38bdf8',
    description: 'Al meter la cabeza doblan el cuello en forma de S. El PDF indica que este grupo es el más numeroso.',
    families: [
      {
        name: 'Cheloniidae',
        common: 'tortugas marinas',
        count: '4 especies, 0 endémicas',
        traits: ['Hábitos acuáticos marinos.', 'No pueden retraer completamente la cabeza.', 'Cabeza grande.', 'Extremidades a manera de aletas o remos.', 'Extremidades anteriores bastante largas; las posteriores son más cortas.', 'El sexo depende de la temperatura de incubación: más caliente favorece hembras y menos caliente machos.', 'Caparazón menos convexo que en otras familias, con forma hidrodinámica.'],
        species: [sp('Caretta caretta','caguama'), sp('Chelonia mydas','tortuga de sopa'), sp('Eretmochelys imbricata','tortuga de carey'), sp('Lepidochelys olivacea','tortuga olivácea')]
      },
      {
        name: 'Chelydridae',
        common: 'tortuga mordedora',
        count: '1 especie en el país',
        traits: ['Habita el Bosque Húmedo Tropical del Chocó y el Bosque Piemontano Occidental.', 'Cabeza triangular con hocico puntiagudo y poderoso gancho apical.', 'Caparazón aplanado con placas marginales dentadas.', 'Peto reducido y en forma de cruz.', 'Cola larga y puntiaguda.', 'Buenas nadadoras y de comportamiento agresivo.', 'Patas y garras desarrolladas con membranas entre los dedos.', 'Omnívoras: consumen peces, anfibios, serpientes, carroña y plantas acuáticas.'],
        species: [sp('Chelydra acutirostris','tortuga mordedora')]
      },
      {
        name: 'Dermochelyidae',
        common: 'tortuga laúd',
        count: '1 especie',
        traits: ['Habita en Matorral Seco de la Costa y Galápagos.', 'Caparazón liso y alargado, en forma de lira.', 'Cola corta.', 'Enormes aletas sin garras o uñas.', 'Placas óseas ausentes, excepto en la nuca y en el borde del plastrón.', 'Siete quillas longitudinales prominentes; caparazón dividido en ocho secciones.', 'Cuello corto y no completamente retráctil.', 'Hocico con profundas escotaduras que forman dos dientes en forma de W visto de frente.', 'Es la más grande: puede medir 210 cm, 2,7 m de envergadura y 900 kg.'],
        species: [sp('Dermochelys coriacea','tortuga de cuero o laúd')]
      },
      {
        name: 'Geoemydidae',
        common: 'tortugas semiacuáticas',
        count: '3 especies en el país',
        traits: ['Caparazón de forma ovalada y aplanada.', 'Cuerpo de forma hidrodinámica.', 'Carecen de aletas.', 'Especies asociadas a bosques húmedos tropicales y piemontanos occidentales.'],
        species: [sp('Rhinoclemmys annulata','tortuga trueno'), sp('Rhinoclemmys melanosterna','cabeza pintada'), sp('Rhinoclemmys nasuta','tortuga blanca')]
      },
      {
        name: 'Kinosternidae',
        common: 'tortugas de ciénaga, tapaculo',
        count: '2 especies de agua dulce en el país',
        traits: ['La parte delantera y posterior del peto son móviles.', 'Pueden cerrar la abertura anterior y posterior.', 'Son pequeñas; no miden más de 17 cm de largo.', 'Buenas nadadoras.', 'Caparazón café oscuro y plastrón café amarillento.', 'Cabeza bicolor: pardo oscuro en el dorso y amarillenta en la zona ventral.', 'Omnívoras: comen peces, renacuajos, gusanos, crustáceos, moluscos, insectos, plantas acuáticas, frutos y carroña.'],
        species: [sp('Kinosternon leucostomum','tapaculo de la costa'), sp('Kinosternon scorpioides','tapaculo amazónica')]
      }
    ]
  }
].map(s => ({...s, families: s.families.sort((a,b)=>a.name.localeCompare(b.name)).map(f => ({...f, species: f.species.sort((a,b)=>a.scientific.localeCompare(b.scientific))}))}));

const orderTraits = ['Presencia de caparazón formado por huesos planos cubiertos de escudos córneos.', 'Vértebras y costillas soldadas al caparazón.', 'Carecen de esternón.', 'Dientes perdidos; mandíbulas con ranfoteca resistente.', 'Crecimiento continuo.', 'Reproducción ovípara con huevos de cáscara resistente.'];
const totals = suborders.reduce((acc,s)=>({families:acc.families+s.families.length, species:acc.species+s.families.reduce((n,f)=>n+f.species.length,0)}),{families:0,species:0});

function Species({ item }) { return <div className="species"><em>{item.scientific}</em>{item.common && <span> — {item.common}</span>}{item.endemic && <b>Endémica</b>}{item.status && <small>{item.status}</small>}</div>; }
function Modal({ family, suborder, onClose }) { return <AnimatePresence>{family && <motion.div className="modalBackdrop" onClick={onClose} initial={{opacity:0}} animate={{opacity:1}} exit={{opacity:0}}><motion.article className="modal" style={{'--c':suborder.color}} onClick={e=>e.stopPropagation()} initial={{opacity:0,y:25,scale:.96}} animate={{opacity:1,y:0,scale:1}} exit={{opacity:0,y:25,scale:.96}}><button className="close" onClick={onClose}><X size={20}/></button><p className="eyebrow">{suborder.name} · Familia</p><h2>{family.name}</h2><p className="familyCommon">{family.common}</p><div className="modalGrid"><section><h3>Características de la familia</h3>{family.traits.map(t=><p key={t}>• {t}</p>)}</section><section><h3>Especies representativas</h3><div className="speciesList">{family.species.map(s=><Species key={s.scientific} item={s}/>)}</div></section></div></motion.article></motion.div>}</AnimatePresence> }
function FamilyCard({ family, suborder, i, onOpen }) { return <motion.button className="familyCard" style={{'--c':suborder.color}} onClick={()=>onOpen(family,suborder)} initial={{opacity:0,y:14}} animate={{opacity:1,y:0}} transition={{delay:i*.035}}><div className="cardTop"><span>{String(i+1).padStart(2,'0')}</span><strong>{family.name}</strong></div><p>{family.common}</p><small>{family.count}</small><div className="preview">{family.traits.slice(0,2).map(t=><span key={t}>{t}</span>)}</div><div className="openLine">Ver ficha <ChevronRight size={16}/></div></motion.button> }

export default function App(){
  const [active,setActive]=useState(''); const [query,setQuery]=useState(''); const [selected,setSelected]=useState(null); const [selectedSub,setSelectedSub]=useState(suborders[0]); const [present,setPresent]=useState(false);
  const visible=useMemo(()=>!active?[]:suborders.filter(s=>s.name===active).map(s=>({...s,families:s.families.filter(f=>`${f.name} ${f.common} ${f.traits.join(' ')} ${f.species.map(x=>x.scientific+' '+x.common).join(' ')}`.toLowerCase().includes(query.toLowerCase()))})),[active,query]);
  const open=(f,s)=>{setSelected(f);setSelectedSub(s)};
  const select=name=>{setActive(p=>p===name?'':name);setQuery('');setTimeout(()=>document.getElementById('familias')?.scrollIntoView({behavior:'smooth'}),80)};
  return <main className={present?'app presentation':'app'}><section className="hero"><div className="orb one"/><div className="orb two"/><p className="badge">Clase Reptiles</p><h1>Orden Testudines</h1><p className="subtitle">Tortugas del Ecuador · esquema taxonómico interactivo</p><div className="stats"><div><b>{totals.families}</b><span>familias</span></div><div><b>35</b><span>especies en Ecuador</span></div><div><b>14</b><span>endémicas</span></div></div></section><section className="scheme"><div className="box top">Reptiles</div><div className="line v1"/><div className="box mid">Chelonia / Testudines</div><div className="line v2"/><div className="line h"/><div className="schemeBtns">{suborders.map(s=><button key={s.name} onClick={()=>select(s.name)} className={active===s.name?'active':''} style={{'--c':s.color}}><span className="photo">🐢</span><strong>{s.name.toUpperCase()}</strong><em>{s.common}</em></button>)}</div></section>{active && <><section className="controls"><label><Search size={18}/><input value={query} onChange={e=>setQuery(e.target.value)} placeholder="Buscar familia o especie..."/></label><label><Filter size={18}/><select value={active} onChange={e=>setActive(e.target.value)}>{suborders.map(s=><option key={s.name}>{s.name}</option>)}</select></label></section><section className="intro"><BookOpen size={20}/><div><h2>Familias de {active}</h2><p>{suborders.find(s=>s.name===active)?.description}</p></div><button onClick={()=>setPresent(!present)}><Presentation size={18}/>{present?'Salir':'Presentar'}</button></section><section id="familias" className="orders">{visible.map(s=><div key={s.name} className="suborder" style={{'--c':s.color}}><div className="orderHead"><div className="icon">🐢</div><div><p className="eyebrow">Suborden</p><h2>{s.name}</h2><p>{s.common}</p></div></div><div className="traits">{orderTraits.map(t=><span key={t}>{t}</span>)}</div><div className="grid">{s.families.map((f,i)=><FamilyCard key={f.name} family={f} suborder={s} i={i} onOpen={open}/>)}</div></div>)}</section></>}<footer><GitBranch size={18}/> Orden Testudines · Clase Reptiles</footer><Modal family={selected} suborder={selectedSub} onClose={()=>setSelected(null)}/></main>
}
