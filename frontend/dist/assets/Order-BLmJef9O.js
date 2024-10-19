import{r as o,j as e,L as me}from"./index-DAiR3oa6.js";import xe from"./Navbar-CBZCZxDR.js";import{a as X}from"./api-6F4pbJpc.js";import{s as K,F as he,a as ue,b as fe,c as ge,d as pe,S as ae}from"./sweetalert2.esm.all-B4pWJWnF.js";import{d as je,C as ye,L as be,a as Ne,b as we,P as De,p as Se,c as ve,e as Ie,f as Ce,E as ce}from"./PDFDownloadModal-CS-dL3Os.js";import{S as oe}from"./SpinnerOnly-h6FUhjzO.js";const Pe=({setAddOrderModal:n})=>{const N=t=>{const a=String(t.getDate()).padStart(2,"0"),c=String(t.getMonth()+1).padStart(2,"0");return`${t.getFullYear()}-${c}-${a}`},[x,w]=o.useState([]),[z,_]=o.useState([]),[h,u]=o.useState([]),[k,C]=o.useState(!1),[j,P]=o.useState(null),[$,S]=o.useState(1),[F,B]=o.useState(N(new Date)),[E,T]=o.useState(!1),[y,M]=o.useState({date:"",itemError:""}),[Q,i]=o.useState("");o.useEffect(()=>{(async()=>{try{const a=await X.getItems();a.error?K("Error!","Something went wrong!","error"):_(a.data)}catch(a){console.log(a)}})()},[]);const b=t=>{const a=t.target.value;j&&P(null),i(a.toUpperCase()),l(a)},l=t=>{if(!t){C(!1);return}const a=z.filter(c=>c.name.toUpperCase().includes(t.toUpperCase()));u(a),C(!0)},r=t=>{P(t),C(!1),S(1),M({...y,itemError:""}),i(t.name)},d=()=>x.reduce((t,a)=>{const c=(parseFloat(a.total)||0)*(a.quantity||1);return t+c},0),f=()=>{if(!j){M({...y,itemError:"Please select an item."});return}const t={item:j.name,quantity:$,price:j.price,total:j.price};w([...x,t]),P(null),S(1),i("")},re=t=>{const a=x.filter((c,Y)=>Y!==t);w(a)},ne=()=>{let t=!0;return F||(M({...y,date:"Date is required."}),t=!1),x.length===0&&(K("Error!","Please add at least one item.","error"),t=!1),t},le=async()=>{if(!ne())return;T(!0);const t={date:F,totalAmount:d(),orderDetails:x};try{const a=await X.addOrder(t);if(a.error){K("Error!",a.message,"error");return}K("Success!","Order added successfully!","success"),n(!1)}catch(a){console.error(a),K("Error!","Failed to add order.","error")}finally{T(!1)}};return e.jsxs(e.Fragment,{children:[E&&e.jsx(me,{}),e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-20"}),e.jsx("div",{className:"fixed inset-0 flex items-center justify-center z-30",children:e.jsxs("div",{className:"bg-gray-800 text-white rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto",children:[e.jsx("h2",{className:"text-xl mb-4",children:"Order Entry"}),e.jsxs("div",{className:"flex justify-between mb-4",children:[e.jsxs("div",{className:"w-1/3 mr-2",children:[e.jsx("label",{className:"block mb-2",children:e.jsx("span",{className:"text-white",children:"Order Date"})}),e.jsx("input",{type:"date",className:"p-2 bg-gray-700 rounded w-full",value:F,max:new Date().toISOString().split("T")[0],onChange:t=>B(t.target.value)}),y.date&&e.jsx("p",{className:"text-red-500 text-sm",children:y.date})]}),e.jsxs("div",{className:"flex-1 mr-2",children:[e.jsx("label",{className:"block mb-2",children:e.jsx("span",{className:"text-white",children:"Item Search"})}),e.jsxs("div",{className:"relative",children:[e.jsx("input",{type:"text",className:"p-2 bg-gray-700 rounded w-full h-10",placeholder:"Search for an item",value:Q,onChange:b,autoComplete:"off",onFocus:()=>C(!0)}),k&&h.length>0&&e.jsx("ul",{className:"absolute bg-gray-700 border border-gray-600 max-h-40 overflow-y-auto mt-2 w-full",children:h.map((t,a)=>e.jsx("li",{onClick:()=>r(t),className:"cursor-pointer p-2 hover:bg-gray-600",children:t.name},a))})]}),y.itemError&&e.jsx("p",{className:"text-red-500 text-sm",children:y.itemError})]}),e.jsx("div",{className:"w-1/4 flex items-center",children:e.jsxs("div",{className:"flex items-center w-full",children:[e.jsxs("div",{className:"w-1/2 mr-2",children:[e.jsx("label",{className:"block mb-2",children:e.jsx("span",{className:"text-white",children:"Quantity"})}),e.jsx("input",{type:"number",className:"p-2 bg-gray-700 rounded w-full",value:$,onChange:t=>S(t.target.value)})]}),e.jsx("button",{className:"bg-green-600 hover:bg-green-700 mt-7 text-white py-2 px-4 rounded",onClick:f,children:"Add"})]})})]}),j&&e.jsx("div",{className:"mb-4",children:e.jsxs("span",{className:"text-white",children:["Selected Item Price: ₹",j.price]})}),x.length>0&&e.jsxs("table",{className:"w-full mb-4 border-collapse",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-600",children:[e.jsx("th",{className:"p-2 border-b-2 text-left",children:"#"}),e.jsx("th",{className:"p-2 border-b-2 text-left",children:"Item"}),e.jsx("th",{className:"p-2 border-b-2 text-left",children:"Price"}),e.jsx("th",{className:"p-2 border-b-2 text-left",children:"Quantity"}),e.jsx("th",{className:"p-2 border-b-2 text-left",children:"Total"}),e.jsx("th",{className:"p-2 border-b-2 text-left",children:"Action"})]})}),e.jsx("tbody",{children:x.map((t,a)=>e.jsxs("tr",{className:"border-b",children:[e.jsx("td",{className:"p-2",children:a+1}),e.jsx("td",{className:"p-2",children:t.item}),e.jsxs("td",{className:"p-2",children:["₹",t.price]}),e.jsx("td",{className:"p-2",children:t.quantity}),e.jsxs("td",{className:"p-2",children:["₹",t.total*t.quantity]}),e.jsx("td",{className:"p-2",children:e.jsx("button",{className:"text-red-500 hover:text-red-700",onClick:()=>re(a),children:"Remove"})})]},a))})]}),e.jsxs("div",{className:"flex justify-between",children:[e.jsx("button",{className:"bg-gray-600 hover:bg-gray-700 text-white py-2 px-4 rounded",onClick:()=>n(!1),children:"Cancel"}),e.jsx("button",{className:"bg-blue-600 hover:bg-blue-700 text-white py-2 px-4 rounded",onClick:le,children:"Submit Order"})]})]})})]})},Fe=({setIsModalOpen:n})=>e.jsxs("button",{className:"mt-10 cursor-pointer border border-cyan-600 bg-opacity-20 bg-cyan-600 text-white font-semibold py-2 px-3 rounded-lg shadow-md hover:bg-cyan-600 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2 flex",onClick:()=>n(!0),children:["Download",e.jsx("div",{className:"ml-2 w-6 h-6 transition-opacity duration-300 opacity-100",children:e.jsx("img",{src:je,alt:"Download Icon"})})]});ye.register(be,Ne,we,De,Se,ve);function Ee({incomeHistoryData:n,setIsModalOpen:N,isLoading:x,setAddOrderModal:w}){const z=new Date,_=z.getMonth(),h=z.getFullYear(),[u,k]=o.useState("Monthly"),[C,j]=o.useState(0),[P,$]=o.useState(0);o.useEffect(()=>{if(n&&n.length>0){const i=n.reduce((l,r)=>l+r.totalAmount,0);j(i),$((()=>{if(u==="Daily"){const l=new Date;return n.reduce((r,d)=>{const f=new Date(d.Date);return f.getDate()===l.getDate()&&f.getMonth()===l.getMonth()&&f.getFullYear()===l.getFullYear()?r+d.totalAmount:r},0)}else return n.reduce((l,r)=>{const d=new Date(r.Date),f=d.getFullYear()===h;return u==="Monthly"&&f&&d.getMonth()===_||u==="Yearly"&&f?l+r.totalAmount:l},0)})())}},[n,u,_,h]);const E=u==="Monthly"?(()=>{const i=Array(12).fill(0);return n.filter(l=>new Date(l.Date).getFullYear()===h).forEach(l=>{const r=new Date(l.Date).getMonth();i[r]+=l.totalAmount||0}),i.map((l,r)=>({name:new Date(0,r).toLocaleString("default",{month:"short"}),income:l}))})():u==="Daily"?(()=>{const i=new Date,b=Array(7).fill(0),l=[];for(let r=6;r>=0;r--){const d=new Date(i);d.setDate(i.getDate()-r),l.push(d.toLocaleString("default",{weekday:"short"}))}return n.forEach(r=>{const d=new Date(r.Date),f=Math.floor((i-d)/(1e3*60*60*24));f>=0&&f<7&&(b[6-f]+=r.totalAmount||0)}),l.map((r,d)=>({name:r,income:b[d]}))})():(()=>{const i=Array(5).fill(0),b=Array.from({length:5},(l,r)=>h-4+r);return n.forEach(l=>{const d=new Date(l.Date).getFullYear()-(h-4);d>=0&&d<5&&(i[d]+=l.totalAmount||0)}),b.map((l,r)=>({name:l,income:i[r]}))})(),T=E.map(i=>i.name),y=E.map(i=>i.income),M={labels:T,datasets:[{label:"Income",data:y,borderColor:"#00d8ff",backgroundColor:"rgba(0, 216, 255, 0.2)",tension:.3,fill:!0}]},Q=i=>{k(i.target.value)};return e.jsxs("div",{className:"bg-[#00144c] p-4 lg:p-8 rounded-xl flex flex-row justify-between items-center mb-8",children:[e.jsxs("div",{className:"text-left space-y-3 w-full lg:w-1/3 mb-6 lg:mb-0",children:[e.jsx("h2",{className:"text-lg lg:text-4xl font-bold text-[#ffeda5]",children:"Total income"}),e.jsx("h3",{className:"text-sm lg:text-2xl text-green-300 font-bold",children:x?e.jsx(oe,{}):new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(C)}),e.jsxs("h2",{className:"text-sm lg:text-3xl font-bold text-[#ffeda5]",children:[u," income"]}),e.jsx("h3",{className:"text-sm lg:text-2xl text-green-300 font-bold",children:x?e.jsx(oe,{}):new Intl.NumberFormat("en-IN",{style:"currency",currency:"INR"}).format(P)}),e.jsx(Fe,{setIsModalOpen:N})]}),e.jsxs("div",{className:"w-full lg:w-2/4 flex flex-col justify-center items-center",children:[e.jsxs("div",{className:"flex justify-between mb-4 w-full",children:[e.jsx("div",{className:"bg-gray-700 px-1 py-0.5 rounded-full text-cyan-500",children:e.jsxs("select",{value:u,onChange:Q,className:"text-xs lg:text-sm cursor-pointer bg-gray-700 rounded-full text-[#ffeda5] outline-none",children:[e.jsx("option",{value:"Daily",children:"Daily"}),e.jsx("option",{value:"Monthly",children:"Monthly"}),e.jsx("option",{value:"Yearly",children:"Yearly"})]})}),e.jsx("div",{className:"text-gray-300 text-center mb-2",children:u==="Daily"?"Last 7 Days":u==="Monthly"?h:"Last 5 Years"}),e.jsx("div",{className:"flex justify-end",children:e.jsx("button",{onClick:()=>w(!0),className:"cursor-pointer border border-[#ffeda5] bg-[#23346c] text-[#ffeda5] font-semibold py-2 px-4 rounded-lg shadow-md hover:bg-[#00144c] hover:bg-opacity-30 transition duration-300 ease-in-out transform hover:scale-105 focus:outline-none focus:ring-2",children:"Add Order +"})})]}),e.jsx("div",{className:"flex items-center justify-between w-full",children:e.jsx("div",{className:"flex-1 mx-2 lg:mx-4",style:{height:"250px",width:"100%"},children:e.jsx(Ie,{data:M,options:{responsive:!0,plugins:{legend:{display:!1},tooltip:{backgroundColor:"#333",titleColor:"#fff",bodyColor:"#fff"}},scales:{x:{grid:{display:!1},ticks:{font:{size:10},color:"#999"}},y:{display:!0,grid:{display:!1}}}}})})})]})]})}const Me=""+new URL("logoPDF-DC-zJt13.png",import.meta.url).href,Le=({entry:n={orderDetails:[]},onClose:N})=>e.jsxs(e.Fragment,{children:[e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 z-20"}),e.jsx("div",{className:"fixed inset-0 flex items-center justify-center z-30",children:e.jsxs("div",{className:"bg-[#23346c] text-[#ffeda5] rounded-lg shadow-lg p-6 w-full max-w-4xl mx-auto",children:[e.jsx("h2",{className:"text-xl mb-4 text-center",children:"Order Details"}),e.jsxs("div",{className:"grid grid-cols-2 gap-4 mb-6",children:[e.jsxs("div",{children:[e.jsx("span",{className:"text-[#ffeda5] block",children:"Order Date:"}),e.jsx("p",{className:"text-gray-300",children:new Date(n.Date).toLocaleDateString()})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[#ffeda5] block",children:"Reference Number"}),e.jsx("p",{className:"text-gray-300",children:n.referenceNumber})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[#ffeda5] block",children:"Total Amount:"}),e.jsxs("p",{className:"text-gray-300",children:["₹ ",parseFloat(n.totalAmount).toLocaleString()]})]}),e.jsxs("div",{children:[e.jsx("span",{className:"text-[#ffeda5] block",children:"Payment Method"}),e.jsx("p",{className:"text-gray-300",children:n.paymentMethod})]})]}),e.jsx("h3",{className:"text-lg mb-4",children:"Order Details"}),e.jsxs("table",{className:"w-full mb-4",children:[e.jsx("thead",{className:"bg-gray-700",children:e.jsxs("tr",{children:[e.jsx("th",{className:"text-center",children:"#"}),e.jsx("th",{className:"text-center",children:"Item"}),e.jsx("th",{className:"text-center",children:"Quantity"}),e.jsx("th",{className:"text-center",children:"Unit Price"}),e.jsx("th",{className:"text-center",children:"Total"})]})}),e.jsx("tbody",{children:n.orderDetails&&n.orderDetails.length>0?n.orderDetails.map((x,w)=>e.jsxs("tr",{children:[e.jsx("td",{className:"text-center",children:w+1}),e.jsx("td",{className:"text-center",children:x.item}),e.jsx("td",{className:"text-center",children:x.quantity}),e.jsxs("td",{className:"text-center",children:["₹ ",parseFloat(x.total).toLocaleString()," "]}),e.jsxs("td",{className:"text-center",children:["₹"," ",parseFloat(x.quantity*x.total).toLocaleString()," "]})]},w)):e.jsx("tr",{children:e.jsx("td",{colSpan:5,className:"text-center text-gray-300",children:"No order found."})})})]}),e.jsx("div",{className:"flex justify-end space-x-2",children:e.jsx("button",{onClick:N,className:"bg-gray-600 text-white px-4 py-2 rounded",children:"Close"})})]})})]}),Oe=""+new URL("qr-D1F1f2Gp.jpg",import.meta.url).href,Ae=()=>{const[n,N]=o.useState([]),[x,w]=o.useState(!1),[z,_]=o.useState({}),[h,u]=o.useState(1),[k,C]=o.useState(""),[j,P]=o.useState(!1),[$,S]=o.useState(!0),[F,B]=o.useState(!1),E=5,[T,y]=o.useState(!1),M=async()=>{S(!0);try{const t=await X.getOrders();t.error?swal("!error","error fetching data","error"):N(t.data)}catch(t){console.error("Error fetching income history data",t)}finally{S(!1)}},Q=async(t,a)=>{try{S(!0),(await X.updatePaymentMethod({referenceNumber:a,paymentMethod:t})).error?swal("Error","Could not update payment method.","error"):(M(),swal("Success","Payment method updated!","success"))}catch(c){console.error("Error updating payment method",c),swal("Error","Could not update payment method.","error")}finally{S(!1)}};o.useEffect(()=>{F||M()},[F,T]);const b=(()=>{let t=n;if(k){const a=k.toLowerCase().trim();t=t.filter(c=>(c.referenceNumber?c.referenceNumber.toString().toLowerCase():"").includes(a))}return t})(),l=b.length,r=Math.ceil(l/E),d=b.slice((h-1)*E,h*E),f=t=>{_(t),w(!0)},re=t=>{const v=t.orderDetails.length,p=60+Math.min(v)*8+130,s=new ce({orientation:"portrait",unit:"mm",format:[75,p]});s.setTextColor(0,0,0);const H=new Date(t.Date),Z=`${String(H.getDate()).padStart(2,"0")}/${String(H.getMonth()+1).padStart(2,"0")}/${H.getFullYear()}`,U=new Date,G=`${String(U.getHours()).padStart(2,"0")}:${String(U.getMinutes()).padStart(2,"0")}:${String(U.getSeconds()).padStart(2,"0")} ${U.getHours()>=12?"PM":"AM"}`;s.setFontSize(9),s.text("RECEIPT OF SALE",23,5),s.line(22.9,6,50.9,6),s.addImage(Me,"PNG",18,6.5,35,20),s.text("Puthur Bypass Road, Kottakkal - 676503",9,27),s.text("+91 7994 568 370",23,32),s.setLineDash([1,1],0),s.line(5,35,70,35),s.setLineDash([]),s.setFontSize(8),s.text("Bill No:",5,40),s.text(t.referenceNumber,5,44),s.text("Date : ",45,40),s.text("Time : ",45,44),s.text(Z,53,40),s.text(G,53,44),s.setFontSize(8),s.setLineDash([1,1],0),s.line(5,47,70,47),s.setLineDash([]);let g=51;s.setFontSize(9),s.text("No",5,g),s.text("Item",11.5,g),s.text("Qty",41,g),s.text("Price",50,g),s.text("Total",62,g),s.line(5,g+3,70,g+3);let L=0,ee=0;t.orderDetails.forEach((I,J)=>{const R=g+10+J*8;s.setFontSize(9),s.text((J+1).toString(),5,R);const te=[];for(let A=0;A<I.item.length;A+=15)te.push(I.item.substring(A,A+15));te.forEach((A,ie)=>{const de=R+ie*3;s.text(A,11.5,de)}),s.setFontSize(9),s.text(I.quantity.toString(),42.5,R),s.text(`${I.total.toFixed(2)}`,50,R);const se=I.quantity*I.total;s.text(`${se.toFixed(2)}`,62,R),L+=I.quantity,ee+=se});const V=g+10+Math.min(v)*8;s.line(5,V-2,70,V-2);const m=V;s.setFontSize(10),s.text(`Total Quantity : ${L.toString()}`,5,m+3),s.setFontSize(14),s.setFont("Helvetica","bold"),s.text(`Total Amount : ${ee.toFixed(2)}`,13,m+11);const D=m+15;s.setFontSize(10),s.text("Scan and Pay here...",20,D+5),s.addImage(Oe,"PNG",14,D+6,50,50),s.setFont("normal"),s.text("Thank you!... Visit again...",19,D+65);const W=s.output("blob"),q=URL.createObjectURL(W),O=window.open(q);O.onload=()=>{O.print(),O.onafterprint=()=>{O.close(),URL.revokeObjectURL(q)}}},ne=(t,a,c,Y,v)=>{const p=new ce;p.setFontSize(12),a.setHours(23,59,59,999);let s;c==="monthly"?s=`Income History for ${new Date(v,Y-1).toLocaleString("default",{month:"long"})} ${v}`:c==="yearly"?s=`Income History for ${v}`:s=`Income History from ${t.toLocaleDateString("en-IN")} to ${a.toLocaleDateString("en-IN")}`;const H=["Date","Reference Number","Payment Method","UPI","Cash"],Z=n.filter(m=>{const D=new Date(m.Date);return D>=t&&D<=a}),U=[30,50,50,30,30];typeof s=="string"&&p.text(s,75,10),H.forEach((m,D)=>{const W=10+U.slice(0,D).reduce((q,O)=>q+O,0);typeof m=="string"&&p.text(m,W,25)}),p.line(10,30,200,30);let G=0,g=0;Z.forEach((m,D)=>{const W=new Date(m.Date).toLocaleDateString("en-GB"),q=m.paymentMethod==="UPI"?m.totalAmount.toFixed(2):"",O=m.paymentMethod==="Cash"?m.totalAmount.toFixed(2):"",I=[W,m.referenceNumber,m.paymentMethod,q,O];m.paymentMethod==="UPI"?G+=m.totalAmount||0:m.paymentMethod==="Cash"&&(g+=m.totalAmount||0),I.forEach((J,R)=>{const te=10+U.slice(0,R).reduce((se,A)=>se+A,0);typeof J=="string"&&p.text(J,te,35+D*10)})});const L=35+Z.length*10;p.line(10,L,200,L);const ee=G+g;p.text(`Total Income (UPI): ${G.toFixed(2)}`,130,L+10),p.text(`Total Income (Cash): ${g.toFixed(2)}`,130,L+20),p.text(`Total Income (Overall): ${ee.toFixed(2)}`,130,L+30);const V=c==="custom"?`income_history_${t.toLocaleDateString("en-GB")}_to_${a.toLocaleDateString("en-GB")}.pdf`:c==="yearly"?`income_history_${v}.pdf`:`income_history_${new Date(v,Y-1).toLocaleString("default",{month:"long"})}_${v}.pdf`;p.save(V)},le=async t=>{const{value:a}=await ae.fire({title:"Confirm Deletion",input:"password",inputLabel:"Please enter your password",inputPlaceholder:"Password",showCancelButton:!0,confirmButtonText:"Delete",cancelButtonText:"Cancel",inputValidator:c=>{if(!c)return"You need to enter a password!";if(c!=="1234")return"Incorrect Password"}});if(a==="1234")try{(await X.deleteOrder(t)).error?ae.fire("Error","There was an error deleting the expense.","error"):(y(!T),ae.fire("Deleted!","Your expense has been deleted.","success"))}catch(c){console.error("Error deleting expense:",c),ae.fire("Error","There was an error deleting the expense.","error")}};return e.jsxs("div",{className:"min-h-screen bg-[#23346c] p-4 lg:p-10 text-gray-100 relative",children:[e.jsxs("main",{className:"mt-8 p-2",children:[e.jsx(Ee,{incomeHistoryData:n,isLoading:$,setIsModalOpen:P,setAddOrderModal:B}),e.jsxs("div",{className:"bg-[#00144c] p-6 lg:p-10 rounded-lg",children:[e.jsxs("div",{className:"flex flex-col lg:flex-row justify-between items-center mb-6",children:[e.jsx("h3",{className:"text-xl lg:text-2xl font-bold text-[#ffeda5]",children:"Order History"}),e.jsx("input",{type:"text",value:k,onChange:t=>C(t.target.value),placeholder:"Search by ref. num",className:"mt-4 lg:mt-0 bg-gray-700 text-gray-100 px-4 py-2 rounded-lg w-full lg:w-auto"})]}),e.jsxs("table",{className:"w-full text-left",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"text-gray-500",children:[e.jsx("th",{className:"pb-2",children:"Date"}),e.jsx("th",{className:"pb-2",children:"Reference"}),e.jsx("th",{className:"pb-2",children:"Amount"}),e.jsx("th",{className:"pb-2",children:"Payment Method"}),e.jsx("th",{className:"pb-2",children:"Action"}),e.jsx("th",{className:"pb-2",children:"Print"})]})}),e.jsx("tbody",{children:$?e.jsx("tr",{children:e.jsx("td",{colSpan:"7",className:"py-4 text-center text-gray-500",children:e.jsx(oe,{})})}):d.length>0?d.map(t=>e.jsxs("tr",{className:"border-b border-gray-700",children:[e.jsx("td",{className:"py-2",children:new Date(t.Date).toLocaleDateString("en-GB")}),e.jsx("td",{className:"py-2",children:t.referenceNumber}),e.jsx("td",{className:"py-2",children:t.totalAmount}),e.jsx("td",{className:"py-2",children:e.jsxs("select",{value:t.paymentMethod,onChange:a=>Q(a.target.value,t.referenceNumber),className:"bg-gray-700 text-gray-100 rounded-md",children:[e.jsx("option",{value:"Pending",children:"Pending"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"UPI",children:"UPI"})]})}),e.jsxs("td",{className:"py-2 flex gap-3",children:[e.jsx("button",{onClick:()=>f(t),className:"text-[#ffeda5]",children:e.jsx(he,{})}),e.jsx("button",{onClick:()=>le(t._id),className:"text-[#ffeda5]",children:e.jsx(ue,{className:"text-red-600"})})]}),e.jsx("td",{className:"py-2",children:e.jsx("button",{onClick:()=>re(t),className:"text-[#ffeda5] flex",children:e.jsx(fe,{})})})]},t.id)):e.jsx("tr",{children:e.jsx("td",{colSpan:"7",className:"py-4 text-center text-gray-500",children:"No data available"})})})]}),d.length>0&&e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsx("button",{onClick:()=>u(t=>Math.max(t-1,1)),disabled:h===1,className:"bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg",children:e.jsx(ge,{})}),e.jsxs("span",{children:["Page ",h," of ",r]}),e.jsx("button",{onClick:()=>u(t=>Math.min(t+1,r)),disabled:h===r,className:"bg-cyan-400 text-gray-900 px-4 py-2 rounded-lg",children:e.jsx(pe,{})})]})]})]}),x&&e.jsx(Le,{isOpen:x,onClose:()=>w(!1),entry:z}),j&&e.jsx(Ce,{generatePDF:ne,setIsModalOpen:P}),F&&e.jsx(Pe,{setAddOrderModal:B})]})},ze=()=>{const[n,N]=o.useState(!1);return e.jsxs(e.Fragment,{children:[e.jsx(xe,{setAddOrderModal:N}),e.jsx(Ae,{addOrderModal:n}),n&&e.jsx(AddOrder,{setAddOrderModal:N})]})};export{ze as default};
