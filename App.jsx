import React, { useEffect, useState } from 'react';
import API from './api';
import './index.css';

export default function App() {
  const [panel, setPanel] = useState('dashboard');
  const [fields, setFields] = useState([]);
  const [inventory, setInventory] = useState([]);
  const [operations, setOperations] = useState([]);
  const [loading, setLoading] = useState(true);

  async function loadAll(){
    try {
      const [f, i, o] = await Promise.all([
        API.get('/fields'),
        API.get('/inventory'),
        API.get('/operations')
      ]);
      setFields(f.data);
      setInventory(i.data);
      setOperations(o.data);
    } catch(e){
      console.error('Failed to load data', e);
      // continue with empty state
    } finally {
      setLoading(false);
    }
  }

  useEffect(()=>{ loadAll(); }, []);

  async function addField(name, area, variety){
    try {
      const res = await API.post('/fields', { name, area, variety });
      setFields(prev=>[res.data, ...prev]);
    } catch(e){
      alert('فشل إضافة الحقل');
      console.error(e);
    }
  }

  async function addOp(payload){
    try {
      const res = await API.post('/operations', payload);
      setOperations(prev=>[res.data, ...prev]);
    } catch(e){
      alert('فشل تسجيل العملية');
      console.error(e);
    }
  }

  async function addInv(item){
    try {
      const res = await API.post('/inventory', item);
      setInventory(prev => [res.data, ...prev]);
    } catch(e){
      alert('فشل إضافة المخزون');
      console.error(e);
    }
  }

  return (
    <div className="app-root" dir="rtl">
      <header className="app-header">
        <div>
          <h1>نظام إدارة محصول البطاطس</h1>
          <div className="sub">لوحة تحكم لإدارة الحقول، العمليات والمخزون</div>
        </div>
        <div className="header-actions">
          <button className="btn" onClick={()=>setPanel('dashboard')}>الرئيسية</button>
        </div>
      </header>

      <div className="app-body">
        <aside className="sidebar">
          <nav>
            <button className={"nav-btn "+(panel==='dashboard'?'active':'')} onClick={()=>setPanel('dashboard')}>الرئيسية</button>
            <button className={"nav-btn "+(panel==='fields'?'active':'')} onClick={()=>setPanel('fields')}>الحقول</button>
            <button className={"nav-btn "+(panel==='operations'?'active':'')} onClick={()=>setPanel('operations')}>العمليات</button>
            <button className={"nav-btn "+(panel==='inventory'?'active':'')} onClick={()=>setPanel('inventory')}>المخازن</button>
            <button className={"nav-btn "+(panel==='reports'?'active':'')} onClick={()=>setPanel('reports')}>التقارير</button>
            <button className={"nav-btn "+(panel==='settings'?'active':'')} onClick={()=>setPanel('settings')}>الإعدادات</button>
          </nav>
        </aside>

        <main className="main">
          {loading && <div className="loading">جاري التحميل...</div>}

          {!loading && panel==='dashboard' && (
            <div>
              <h2>لوحة المعلومات</h2>
              <div className="cards">
                <div className="card">
                  <div className="card-title">الحقول</div>
                  <div className="card-value">{fields.length}</div>
                </div>
                <div className="card">
                  <div className="card-title">مجموع المخزون (كم)</div>
                  <div className="card-value">{inventory.reduce((s,i)=>s+(Number(i.qty)||0),0)}</div>
                </div>
                <div className="card">
                  <div className="card-title">العمليات</div>
                  <div className="card-value">{operations.length}</div>
                </div>
              </div>

              <section className="panel">
                <h3>آخر العمليات</h3>
                <div className="list">
                  {operations.slice(0,8).map(op => (
                    <div key={op.id} className="list-row">
                      <div>{op.date}</div>
                      <div>{op.type}</div>
                      <div>{op.field_name || op.field_id}</div>
                    </div>
                  ))}
                  {operations.length===0 && <div className="muted">لا توجد عمليات مسجلة</div>}
                </div>
              </section>
            </div>
          )}

          {!loading && panel==='fields' && (
            <div>
              <h2>الحقول</h2>
              <AddFieldForm onAdd={addField}/>
              <div className="grid">
                {fields.map(f=>(
                  <div className="card small" key={f.id}>
                    <div className="card-title">{f.name}</div>
                    <div className="muted">المساحة: {f.area} فدان</div>
                    <div className="muted">الصنف: {f.variety}</div>
                  </div>
                ))}
                {fields.length===0 && <div className="muted">لم يتم إضافة حقول بعد</div>}
              </div>
            </div>
          )}

          {!loading && panel==='operations' && (
            <div>
              <h2>العمليات</h2>
              <AddOpForm fields={fields} onAdd={addOp}/>
              <div className="list">
                {operations.map(op=>(
                  <div className="list-row" key={op.id}>
                    <div>{op.date}</div>
                    <div>{op.type}</div>
                    <div>{op.field_name || op.field_id}</div>
                    <div className="muted">{op.notes}</div>
                  </div>
                ))}
                {operations.length===0 && <div className="muted">لا توجد عمليات</div>}
              </div>
            </div>
          )}

          {!loading && panel==='inventory' && (
            <div>
              <h2>المخازن</h2>
              <AddInventoryForm onAdd={addInv}/>
              <div className="grid">
                {inventory.map(it=>(
                  <div className="card small" key={it.id}>
                    <div className="card-title">{it.name}</div>
                    <div className="muted">{it.qty} {it.unit}</div>
                  </div>
                ))}
                {inventory.length===0 && <div className="muted">لا توجد عناصر في المخزن</div>}
              </div>
            </div>
          )}

          {!loading && panel==='reports' && (
            <div>
              <h2>التقارير</h2>
              <div className="panel">يمكنك إضافة رسوم بيانية وتصدير CSV هنا.</div>
            </div>
          )}

          {!loading && panel==='settings' && (
            <div>
              <h2>الإعدادات</h2>
              <div className="panel">إعدادات التطبيق (API URL، المصادقة...)</div>
            </div>
          )}

        </main>
      </div>

      <footer className="app-footer">تم الإنشاء بواسطة نظام تجريبي · Potato Manager</footer>
    </div>
  );
}

/* Helper components */

function AddFieldForm({onAdd}){
  const [name,setName]=useState(''); const [area,setArea]=useState(''); const [var,setVar]=useState('');
  return (
    <div className="form">
      <input placeholder="اسم الحقل" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="المساحة (فدان)" value={area} onChange={e=>setArea(e.target.value)} />
      <input placeholder="الصنف" value={var} onChange={e=>setVar(e.target.value)} />
      <button className="btn" onClick={()=>{ if(!name){ alert('ادخل اسم الحقل'); return; } onAdd(name, Number(area)||0, var); setName(''); setArea(''); setVar(''); }}>أضف</button>
    </div>
  );
}

function AddOpForm({fields, onAdd}){
  const [date,setDate]=useState(''); const [field,setField]=useState(''); const [type,setType]=useState(''); const [notes,setNotes]=useState('');
  return (
    <div className="form">
      <input type="date" value={date} onChange={e=>setDate(e.target.value)} />
      <select value={field} onChange={e=>setField(e.target.value)}>
        <option value="">اختر الحقل</option>
        {fields.map(f=> <option key={f.id} value={f.id}>{f.name}</option>)}
      </select>
      <select value={type} onChange={e=>setType(e.target.value)}>
        <option value="">نوع العملية</option>
        <option value="زراعة">زراعة</option>
        <option value="ري">ري</option>
        <option value="تسميد">تسميد</option>
        <option value="رش">رش</option>
        <option value="حصاد">حصاد</option>
      </select>
      <input placeholder="ملاحظات" value={notes} onChange={e=>setNotes(e.target.value)} />
      <button className="btn" onClick={()=>{ if(!date||!field||!type){ alert('اكمل البيانات'); return; } onAdd({date, field_id: Number(field)||null, type, notes}); setDate(''); setField(''); setType(''); setNotes(''); }}>سجل</button>
    </div>
  );
}

function AddInventoryForm({onAdd}){
  const [name,setName]=useState(''); const [qty,setQty]=useState(''); const [unit,setUnit]=useState('');
  return (
    <div className="form">
      <input placeholder="اسم المنتج" value={name} onChange={e=>setName(e.target.value)} />
      <input placeholder="الكمية" value={qty} onChange={e=>setQty(e.target.value)} />
      <input placeholder="الوحدة" value={unit} onChange={e=>setUnit(e.target.value)} />
      <button className="btn" onClick={()=>{ if(!name){ alert('ادخل اسم المنتج'); return; } onAdd({name, qty: Number(qty)||0, unit}); setName(''); setQty(''); setUnit(''); }}>أضف</button>
    </div>
  );
}
