import{j as e,r as l}from"./index-DAiR3oa6.js";import ie from"./Navbar-CBZCZxDR.js";import{a as H}from"./api-6F4pbJpc.js";import{d as ce,C as de,L as xe,a as ue,P as pe,b as fe,p as me,c as he,e as ge,f as ye,E as be}from"./PDFDownloadModal-CS-dL3Os.js";import{c as we,d as De,s as W,a as je,e as Ee,S as w}from"./sweetalert2.esm.all-B4pWJWnF.js";import{S as Q}from"./SpinnerOnly-h6FUhjzO.js";const Ne=({setPdfModalOpen:n})=>e.jsxs("button",{className:"cursor-pointer border border-cyan-600 bg-opacity-20 bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 flex",onClick:()=>n(!0),children:["Download",e.jsx("div",{className:"ml-2 w-6 h-6 transition-opacity duration-300 opacity-100",children:e.jsx("img",{src:ce,alt:"Download Icon"})})]});de.register(xe,ue,pe,fe,me,he);const ae=new Date,ve=ae.getMonth();ae.getFullYear();function Se({expenseHistoryData:n,setPdfModalOpen:b,isLoading:f,setAddExpenseModal:D}){const[c,$]=l.useState("Monthly"),[m,N]=l.useState(new Date().getFullYear()),[E,M]=l.useState(""),[I,v]=l.useState("");l.useEffect(()=>{const r=n.reduce((a,s)=>a+s.totalExpense,0);let p=0;if(c==="Monthly")p=n.reduce((a,s)=>{const o=new Date(s.date);return o.getMonth()===ve&&o.getFullYear()===m?a+(s.totalExpense||0):a},0);else if(c==="Daily"){const a=new Date;p=n.reduce((s,o)=>new Date(o.date).toDateString()===a.toDateString()?s+(o.totalExpense||0):s,0)}else c==="Yearly"&&(p=n.filter(s=>new Date(s.date).getFullYear()===m).reduce((s,o)=>s+(o.totalExpense||0),0));v(p),M(r)},[n,c,m]);const x=r=>{const p=r.target.value;$(p),p!=="Monthly"&&N(new Date().getFullYear())},C=c==="Monthly"?(()=>{const r=Array(12).fill(0);return n.filter(a=>new Date(a.date).getFullYear()===m).forEach(a=>{const o=new Date(a.date).getMonth();r[o]+=a.totalExpense||0}),r.map((a,s)=>({name:new Date(0,s).toLocaleString("default",{month:"short"}),expense:a}))})():c==="Daily"?(()=>{const r=new Date,p=Array(7).fill(0),a=[];for(let s=6;s>=0;s--){const o=new Date(r);o.setDate(r.getDate()-s);const t=o.toLocaleString("default",{weekday:"short"});a.push(t)}return n.forEach(s=>{const o=new Date(s.date),t=Math.floor((r-o)/(1e3*60*60*24));t>=0&&t<7&&(p[6-t]+=s.totalExpense||0)}),a.map((s,o)=>({name:s,expense:p[o]}))})():(()=>{const r=Array(5).fill(0),p=[];for(let a=0;a<5;a++){const s=m-4+a;p.push(s)}return n.forEach(a=>{const o=new Date(a.date).getFullYear()-(m-4);o>=0&&o<5&&(r[o]+=a.totalExpense||0)}),p.map((a,s)=>({name:a,expense:r[s]}))})(),k=C.map(r=>r.name),A=C.map(r=>r.expense),_={labels:k,datasets:[{label:"expense",data:A,borderColor:"#00d8ff",backgroundColor:"rgba(0, 216, 255, 0.2)",tension:.3,fill:!0}]},F=()=>{m>new Date().getFullYear()-5&&N(r=>r-1)},z=()=>{m<new Date().getFullYear()&&N(r=>r+1)};return console.log(E,"totalexp"),e.jsx(e.Fragment,{children:e.jsxs("div",{className:"bg-[#00144c] p-4 lg:p-8 rounded-xl flex flex-row justify-between items-center mb-8",children:[e.jsxs("div",{className:"text-left space-y-3 w-full lg:w-1/3 mb-6 lg:mb-0",children:[e.jsx("h2",{className:"text-lg lg:text-4xl font-bold text-[#ffeda5]",children:"Total expense"}),e.jsx("h3",{className:"text-sm lg:text-2xl text-green-300 font-bold",children:f?e.jsx(Q,{}):new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(E)}),e.jsx("p",{className:"text-xs lg:text-base text-gray-500",children:new Date().toLocaleDateString()}),e.jsxs("h2",{className:"text-sm lg:text-3xl font-bold text-[#ffeda5]",children:[c," expense"]}),e.jsx("h3",{className:"text-sm lg:text-2xl text-green-300 font-bold",children:f?e.jsx(Q,{}):new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(I)}),e.jsx(Ne,{setPdfModalOpen:b})]}),e.jsxs("div",{className:"w-full lg:w-2/4 flex flex-col justify-center items-center",children:[e.jsxs("div",{className:"flex justify-between mb-4 w-full",children:[e.jsx("div",{className:"bg-gray-700 px-1 py-0.5 rounded-full text-[#ffeda5]",children:e.jsxs("select",{value:c,onChange:x,className:"text-xs lg:text-sm cursor-pointer bg-gray-700 rounded-full text-[#ffeda5] outline-none",children:[e.jsx("option",{value:"Daily",className:"cursor-pointer",children:"Daily"}),e.jsx("option",{value:"Monthly",children:"Monthly"}),e.jsx("option",{value:"Yearly",children:"Yearly"})]})}),e.jsx("div",{className:"text-gray-300 text-center mb-2",children:c==="Daily"?e.jsx("span",{className:"text-sm lg:text-base font-semibold",children:"Last 7 Days"}):c==="Monthly"?e.jsx("span",{className:"text-sm lg:text-base font-semibold",children:m}):e.jsx("span",{className:"text-sm lg:text-base font-semibold",children:"Last 5 Years"})}),e.jsx("div",{className:"w-[15%]"}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:()=>D(!0),className:"cursor-pointer border border-[#ffeda5] bg-[#23346c] text-[#ffeda5] font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#00144c] hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2",children:"Add Expense +"})})]}),e.jsxs("div",{className:"flex items-center justify-between w-full",children:[c==="Monthly"&&e.jsx("button",{onClick:F,className:"bg-gray-700 p-2 rounded-full text-cyan-400 hover:bg-gray-600 transition hidden sm:flex",children:e.jsx(we,{})}),e.jsx("div",{className:"flex-1 mx-2 lg:mx-4",style:{height:"250px",width:"100%"},children:e.jsx(ge,{data:_,options:{elements:{point:{hitRadius:20,radius:4,drawActiveElementsOnTop:!0}},responsive:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#333",titleColor:"#fff",bodyColor:"#fff"}},scales:{x:{ticks:{font:{size:10},color:"#999"}},y:{display:!0,grid:{display:!0}}}}})}),c==="Monthly"&&e.jsx("button",{onClick:z,className:"bg-gray-700 p-2 rounded-full text-cyan-400 hover:bg-gray-600 transition hidden sm:flex",children:e.jsx(De,{})})]})]})]})})}const se=({setAddExpenseModal:n})=>{const b=x=>{const h=String(x.getDate()).padStart(2,"0"),S=String(x.getMonth()+1).padStart(2,"0");return`${x.getFullYear()}-${S}-${h}`},[f,D]=l.useState(b(new Date)),[c,$]=l.useState(""),[m,N]=l.useState(0),[E,M]=l.useState(!1);l.useEffect(()=>{const h=new Date().toISOString().split("T")[0];D(h)},[]);const I=()=>!f||!c||!m?(W("Error!","Please fill out all required fields","error"),!1):!0,v=async()=>{const x={date:new Date(f),expenseDetail:c,totalExpense:m};if(I())try{M(!0);const h=await H.addExpense(x);if(h.error){W("Error!",h.errors[0],"error");return}W("Success!","Expense added successfully!","success"),n(!1)}catch(h){console.error(h),W("Error!","Failed to add expense.","error")}finally{M(!1)}};return e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-black bg-opacity-50 z-50",children:e.jsxs("div",{className:"bg-gray-800 rounded-lg shadow-lg p-6 w-full max-w-lg",children:[e.jsxs("div",{className:"flex justify-between",children:[e.jsx("h2",{className:"text-2xl font-bold mb-4 text-white",children:"Add Expense"}),e.jsx("p",{className:"cursor-pointer",onClick:()=>n(!1),children:"X"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 mb-4",children:[e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"block text-sm font-medium mb-1 text-white",children:"Date"}),e.jsx("input",{type:"date",value:f,onChange:x=>D(x.target.value),className:"border border-gray-400 rounded-md p-2 w-full bg-gray-700 text-white",max:f,required:!0})]}),e.jsxs("div",{className:"form-group",children:[e.jsx("label",{className:"block text-sm font-medium mb-1 text-white",children:"Expense Detail"}),e.jsx("input",{type:"text",value:c,onChange:x=>$(x.target.value),className:"border border-gray-400 rounded-md p-2 w-full bg-gray-700 text-white",required:!0})]})]}),e.jsxs("div",{className:"form-group mb-4",children:[e.jsx("label",{className:"block text-sm font-medium mb-1 text-white",children:"Total Expense"}),e.jsx("input",{type:"number",value:m,onChange:x=>N(parseFloat(x.target.value)),className:"border border-gray-400 rounded-md p-2 w-full bg-gray-700 text-white",required:!0})]}),e.jsx("div",{className:"form-group",children:e.jsx("button",{onClick:v,disabled:E,className:"bg-blue-600 text-white rounded-md p-2 w-full",children:E?"Saving...":"Save Expense"})})]})})},Ce=()=>{const[n,b]=l.useState(1),[f,D]=l.useState([]);l.useState(null),l.useState(!1);const[c,$]=l.useState(""),[m,N]=l.useState(null),[E,M]=l.useState(null),[I,v]=l.useState(!1),[x,h]=l.useState(!1),[S,B]=l.useState(!1),C=5,[k,A]=l.useState(!1);l.useEffect(()=>{S||(async()=>{try{h(!0);const i=await H.showExpense();i&&i.data?D(i.data):(console.error("Unexpected response structure",i),D([]))}catch(i){console.error("Error fetching expense history data",i),D([])}finally{h(!1)}})()},[S,k]);const _=(t,i,d,T,P)=>{const u=new be;u.setFontSize(12);const G=u.internal.pageSize.height,U=10;let j=35;const X=new Date(t),q=new Date(i);q.setHours(23,59,59,999);let L=[];d==="monthly"?L=f.filter(g=>{const y=new Date(g.date);return y.getMonth()+1===T&&y.getFullYear()===P}):d==="yearly"?L=f.filter(g=>new Date(g.date).getFullYear()===P):t&&i?L=f.filter(g=>{const y=new Date(g.date);return y>=X&&y<=q}):L=f;let Y;d==="monthly"?Y=`Expense History for ${new Date(P,T-1).toLocaleString("default",{month:"long"})} ${P}`:d==="yearly"?Y=`Expense History for ${P}`:t&&i?Y=`Expense History from ${X.toLocaleDateString("en-IN")} to ${q.toLocaleDateString("en-IN")}`:Y="Full Expense History",typeof Y=="string"&&u.text(Y,75,10);const J=["Date","Expense Detail","Amount"],ne=J.length,O=(u.internal.pageSize.width-20)/ne;J.forEach((g,y)=>{const V=10+y*O,R=u.getTextWidth(g);u.text(g,V+(O-R)/2,25)}),u.line(10,30,u.internal.pageSize.width-10,30);let K=0;L.forEach(g=>{const y=new Date(g.date).toLocaleDateString("en-IN"),V=g.expenseDetail||"N/A",R=parseFloat(g.totalExpense)||0;K+=R,[y,V,R.toFixed(2)].forEach((te,re)=>{const le=10+re*O,oe=u.getTextWidth(te);u.text(te.toString(),le+(O-oe)/2,j)}),j+=10,j>G-U&&(u.addPage(),j=U)}),j>G-U&&(u.addPage(),j=U);const Z=j+10;u.line(10,Z,u.internal.pageSize.width-10,Z);const ee=`Total Expense: ${K.toFixed(2)}`;u.getTextWidth(ee),u.text(ee,140,j+20),u.save("Expense_History.pdf")},F=Array.isArray(f)?f.filter(t=>{const i=c.toLowerCase();return new Date(t.date).toLocaleDateString("en-GB").includes(i)||t.expenseType.toLowerCase().includes(i)||t.totalExpense.toString().includes(i)}).sort((t,i)=>new Date(i.date)-new Date(t.date)):[],z=n*C,r=z-C,p=F.slice(r,z),a=Math.ceil(F.length/C),s=async t=>{const{value:i}=await w.fire({title:"Confirm Deletion",input:"password",inputLabel:"Please enter your password",inputPlaceholder:"Password",showCancelButton:!0,confirmButtonText:"Delete",cancelButtonText:"Cancel",inputValidator:d=>{if(!d)return"You need to enter a password!";if(d!=="1234")return"Incorrect Password"}});if(i==="1234")try{(await H.deleteExpense(t)).error?w.fire("Error","There was an error deleting the expense.","error"):(A(!k),w.fire("Deleted!","Your expense has been deleted.","success"))}catch(d){console.error("Error deleting expense:",d),w.fire("Error","There was an error deleting the expense.","error")}},o=async t=>{const{value:i}=await w.fire({title:"Confirm Update",input:"password",inputLabel:"Please enter your password",inputPlaceholder:"Password",showCancelButton:!0,confirmButtonText:"Continue",cancelButtonText:"Cancel",inputValidator:d=>{if(!d)return"You need to enter a password!";if(d!=="1234")return"Incorrect Password!"}});if(i==="1234"){const{value:d}=await w.fire({title:"Update Expense",html:`
        <div style="margin-bottom: 10px;">
          <label for="expenseDate" style="display: block; margin-bottom: 2px; font-weight: bold;">Date:</label>
          <input id="expenseDate" type="date" class="swal2-input" style="width: 250px; height: 36px; padding: 8px; box-sizing: border-box;" value="${new Date(t.date).toISOString().split("T")[0]}">
        </div>
        <div style="margin-bottom: 10px;">
          <label for="expenseDetail" style="display: block; margin-bottom: 2px; font-weight: bold;">Expense Detail:</label>
          <input id="expenseDetail" class="swal2-input" placeholder="Expense Detail" style="width: 250px; height: 36px; padding: 8px; box-sizing: border-box;" value="${t.expenseDetail}">
        </div>
        <div style="margin-bottom: 10px;">
          <label for="totalExpense" style="display: block; margin-bottom: 2px; font-weight: bold;">Total Expense:</label>
          <input id="totalExpense" class="swal2-input" placeholder="Total Expense" style="width: 250px; height: 36px; padding: 8px; box-sizing: border-box;" value="${t.totalExpense}">
        </div>
      `,focusConfirm:!1,showCancelButton:!0,confirmButtonText:"Update",cancelButtonText:"Cancel",preConfirm:()=>({date:document.getElementById("expenseDate").value,expenseDetail:document.getElementById("expenseDetail").value,totalExpense:document.getElementById("totalExpense").value})});if(d)try{const T={date:d.date,expenseDetail:d.expenseDetail,totalExpense:parseFloat(d.totalExpense)||0};(await H.updateExpense(t._id,T)).error?w.fire("Error","There was an error updating the expense.","error"):(A(!k),w.fire("Updated!","Your expense has been updated.","success"))}catch(T){w.fire("Error","There was an error updating the expense.","error"),console.error("Error updating expense:",T)}}};return e.jsxs("div",{className:"min-h-screen bg-[#23346c] p-4 lg:p-10 text-gray-100 relative",children:[e.jsxs("main",{className:"mt-8 p-2",children:[e.jsx(Se,{expenseHistoryData:f,isLoading:x,setAddExpenseModal:B,setPdfModalOpen:v}),e.jsxs("div",{className:"bg-[#00144c] p-4 lg:p-10 rounded-xl",children:[e.jsx("div",{className:"flex flex-col lg:flex-row justify-between items-center mb-6 space-y-4 lg:space-y-0",children:e.jsx("h3",{className:"text-2xl font-bold text-[#ffeda5]",children:"Expense History"})}),e.jsxs("table",{className:"w-full text-left",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-gray-500",children:[e.jsx("th",{className:"pb-2",children:"Date"}),e.jsx("th",{className:"pb-2",children:"Expense Detail"}),e.jsx("th",{className:"pb-2",children:"Total Expense"}),e.jsx("th",{className:"pb-2",children:"actions"})]})}),e.jsx("tbody",{children:x?e.jsx("tr",{children:e.jsx("td",{colSpan:"3",className:"py-4 text-center text-gray-500",children:e.jsx(Q,{})})}):F.length===0?e.jsx("tr",{children:e.jsx("td",{colSpan:"3",className:"py-4 text-center text-gray-500",children:"No data available"})}):p.map((t,i)=>e.jsxs("tr",{className:"border-t border-gray-700",children:[e.jsx("td",{className:"py-4",children:new Date(t.date).toLocaleDateString("en-GB")}),e.jsx("td",{className:"py-4",children:t.expenseDetail}),e.jsx("td",{className:"py-4",children:new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(t.totalExpense)}),e.jsxs("td",{className:"py-4 flex gap-3",children:[e.jsx(je,{onClick:()=>s(t._id),className:"text-red-600 cursor-pointer"}),e.jsx(Ee,{onClick:()=>o(t),className:"text-blue-600 cursor-pointer"})]})]},i))})]}),F.length>0&&e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsx("button",{onClick:()=>b(t=>Math.max(t-1,1)),disabled:n===1,className:`bg-cyan-400 px-4 py-2 rounded-lg ${n===1?"opacity-50 cursor-not-allowed":""}`,children:"←"}),e.jsxs("span",{className:"text-gray-500",children:["Page ",n," of ",a]}),e.jsx("button",{onClick:()=>b(t=>Math.min(t+1,a)),disabled:n===a,className:`bg-cyan-400 px-4 py-2 rounded-lg ${n===a?"opacity-50 cursor-not-allowed":""}`,children:"→"})]})]}),S&&e.jsx(se,{setAddExpenseModal:B})]}),I&&e.jsx(ye,{setIsModalOpen:v,customStartDate:m,customEndDate:E,generatePDF:_})]})},Le=()=>{const[n,b]=l.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(ie,{setAddExpenseModal:b}),e.jsx(Ce,{addExpenseModal:n}),n&&e.jsx(se,{setAddExpenseModal:b})]})};export{Le as default};
