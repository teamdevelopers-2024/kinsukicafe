import{r,j as e}from"./index-C_wS1UR8.js";import O from"./Navbar-KEJMZEx1.js";import{a as V}from"./api-yu6R-Exe.js";import{s as _,F as H}from"./index-p7bcWwjK.js";const T=({show:x,onClose:N})=>{const[n,o]=r.useState(""),[u,y]=r.useState(""),[f,k]=r.useState(""),[E,A]=r.useState(0),[d,v]=r.useState([{description:"",amount:"",reference:""}]),P=new Date,b={timeZone:"Asia/Kolkata"},p=P.toLocaleDateString("en-CA",b),[g,S]=r.useState(p),[m,$]=r.useState({});r.useEffect(()=>{const t=d.reduce((c,i)=>c+parseFloat(i.amount||0),0);A(t)},[d]);const F=()=>{v([...d,{description:"",amount:"",reference:""}])},j=(t,c,i)=>{const D=[...d];D[t][c]=i,v(D)},C=t=>{const c=d.filter((i,D)=>D!==t);v(c)},l=()=>{const t={};return g||(t.dateOfService="Date of Service is required."),n||(t.customerName="Customer Name is required."),u||(t.vehicleNumber="Vehicle Number is required."),f||(t.phoneNumber="Phone Number is required."),d.forEach((c,i)=>{c.description||(t[`description_${i}`]="Work Description is required."),c.amount||(t[`amount_${i}`]="Amount is required.")}),$(t),Object.keys(t).length===0},a=async t=>{if(t.preventDefault(),!l())return;const c={dateOfService:g,customerName:n,vehicleNumber:u,phoneNumber:f,creditAmount:E,workDetails:d};try{const i=await V.addcustomer(c);if(i.error){console.log("getting here"),i.errors||_("!Error","internel Server Error","error");const D=i.errors,R={};for(let M=0;M<D.length;M++)console.log(D[M].field),R[D[M].field]=D[M].message;$(R)}else console.log("Response:",i),_("!success","Credit Customer Added Successfully","success"),N()}catch(i){console.error("Error:",i)}},h=t=>{const c=t.target.value;/^\d*$/.test(c)&&k(c)};return x?e.jsx("div",{className:"fixed inset-0 bg-gray-600 bg-opacity-50 overflow-y-auto h-full w-full",children:e.jsxs("div",{className:"relative top-20 mx-auto p-5 border w-[700px] shadow-lg rounded-md bg-gray-800",children:[e.jsx("h3",{className:"text-lg text-teal-400 font-bold mb-4",children:"Add Customer"}),e.jsxs("form",{onSubmit:a,className:"space-y-4",children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Date of Service"}),e.jsx("input",{type:"date",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:g,max:p,onChange:t=>S(t.target.value),placeholder:"Car care date"}),m.dateOfService&&e.jsx("p",{className:"text-red-500 text-sm",children:m.dateOfService})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Customer Name"}),e.jsx("input",{type:"text",placeholder:"Customer name",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:n,onChange:t=>o(t.target.value)}),m.customerName&&e.jsx("p",{className:"text-red-500 text-sm",children:m.customerName})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Vehicle Number"}),e.jsx("input",{type:"text",placeholder:"Vehicle number",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:u.toUpperCase(),onChange:t=>y(t.target.value)}),m.vehicleNumber&&e.jsx("p",{className:"text-red-500 text-sm",children:m.vehicleNumber})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-gray-300 mb-2",children:"Phone Number"}),e.jsx("input",{type:"tel",placeholder:"Phone number",className:"w-full h-10 px-3 rounded bg-gray-700 text-white",value:f,onChange:h,pattern:"[0-9]*",inputMode:"numeric"}),m.phoneNumber&&e.jsx("p",{className:"text-red-500 text-sm",children:m.phoneNumber})]})]}),e.jsxs("table",{className:"w-full mb-4 text-white",children:[e.jsx("thead",{children:e.jsxs("tr",{children:[e.jsx("th",{children:"#"}),e.jsx("th",{children:"Work Description"}),e.jsx("th",{children:"Amount"}),e.jsx("th",{children:"Reference(opt)"}),d.length>1&&e.jsx("th",{children:"Action"})]})}),e.jsx("tbody",{children:d.map((t,c)=>e.jsxs("tr",{children:[e.jsx("td",{children:c+1}),e.jsxs("td",{children:[e.jsx("input",{type:"text",name:"description",value:t.description,onChange:i=>j(c,"description",i.target.value),className:"p-2 bg-gray-700 rounded w-full",placeholder:"Name of the work"}),m[`description_${c}`]&&e.jsx("p",{className:"text-red-500 text-sm",children:m[`description_${c}`]})]}),e.jsxs("td",{children:[e.jsx("input",{type:"number",name:"amount",value:t.amount,onChange:i=>j(c,"amount",i.target.value),className:"p-2 bg-gray-700 rounded w-full",placeholder:"Amount of work"}),m[`amount_${c}`]&&e.jsx("p",{className:"text-red-500 text-sm",children:m[`amount_${c}`]})]}),e.jsx("td",{children:e.jsx("input",{type:"text",name:"reference",value:t.reference,onChange:i=>j(c,"reference",i.target.value),className:"p-2 bg-gray-700 rounded w-full",placeholder:"Additional information"})}),e.jsx("td",{children:c>0&&e.jsx("button",{type:"button",className:"text-red-500",onClick:()=>C(c),children:"🗑"})})]},c))})]}),e.jsxs("div",{className:"flex justify-between items-center",children:[e.jsx("button",{type:"button",className:"text-teal-400 text-sm",onClick:F,children:"+ Add Field"}),e.jsxs("p",{className:"text-white",children:["Total Amount: ₹",E]}),e.jsxs("div",{className:"flex space-x-4",children:[e.jsx("button",{type:"button",className:"bg-teal-400 text-white rounded px-4 py-2 hover:bg-red-600",onClick:N,children:"Cancel"}),e.jsx("button",{type:"submit",className:"bg-teal-400 text-white rounded px-4 py-2 hover:bg-teal-500",children:"Save"})]})]})]})]})}):null},B=({show:x,onClose:N,customer:n})=>x?e.jsx("div",{className:"fixed inset-0 flex items-center justify-center bg-gray-900 bg-opacity-75 z-50",children:e.jsxs("div",{className:"bg-gray-800 text-gray-300 rounded-lg w-full max-w-3xl p-6",children:[e.jsxs("h2",{className:"text-xl font-bold mb-4",children:["Transaction History - ",n.customerName]}),e.jsx("div",{className:"overflow-x-auto",children:e.jsxs("table",{className:"table-auto w-full text-left text-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-700",children:[e.jsx("th",{className:"px-4 py-2",children:"Date"}),e.jsx("th",{className:"px-4 py-2",children:"Vehicle number"}),e.jsx("th",{className:"px-4 py-2",children:"Phone number"}),e.jsx("th",{className:"px-4 py-2",children:"Payment type"}),e.jsx("th",{className:"px-4 py-2",children:"Paid amount"})]})}),e.jsx("tbody",{className:"bg-gray-700",children:n.transactionHistory.map((o,u)=>e.jsxs("tr",{className:"border-t border-gray-600",children:[e.jsx("td",{className:"px-4 py-2",children:new Date(o.date).toLocaleDateString("en-GB")}),e.jsx("td",{className:"px-4 py-2",children:o.vehicleNumber}),e.jsx("td",{className:"px-4 py-2",children:o.phoneNumber}),e.jsx("td",{className:"px-4 py-2",children:o.paymentType}),e.jsx("td",{className:"px-4 py-2",children:o.Amount})]}))})]})}),e.jsx("div",{className:"mt-6 text-right",children:e.jsx("button",{onClick:N,className:"bg-teal-400 text-gray-900 px-4 py-2 rounded-md",children:"Close"})})]})}):null,Z=({show:x,onClose:N,customer:n})=>{const[o,u]=r.useState(n.creditAmount-n.paidAmount),[y,f]=r.useState(""),[k,E]=r.useState(""),[A,d]=r.useState(""),[v,P]=r.useState(""),[b,p]=r.useState(""),g=n.creditAmount-n.paidAmount,S=j=>{const C=parseFloat(j.target.value);u(C),C>g?d(`Amount cannot exceed ₹${g}`):d("")},m=j=>{f(j.target.value),P("")},$=j=>{E(j.target.value),p("")},F=async j=>{j.preventDefault();let C=!1;if(d(""),P(""),p(""),y||(P("Repayment date is required."),C=!0),(o>g||!o)&&(d(o>g?`Amount cannot exceed ₹${g}`:"Repayment amount is required."),C=!0),k||(p("Please select a payment method."),C=!0),C)return;const l={repaymentDate:y,repaymentAmount:o,paymentMethod:k},a=await V.repayment(n,l);console.log(a),a.error?alert("error repayment"):(console.log("Form submitted successfully with the following data:",{repaymentDate:y,repaymentAmount:o,paymentMethod:k}),alert("repayment successfully")),N()};return x?e.jsx("div",{className:"fixed inset-0 bg-gray-900 bg-opacity-75 flex items-center justify-center",children:e.jsxs("div",{className:"bg-gray-800 text-gray-300 p-6 rounded-md w-full max-w-2xl",children:[e.jsx("h2",{className:"text-xl font-semibold mb-4",children:"Payment Details"}),e.jsxs("form",{onSubmit:F,children:[e.jsxs("div",{className:"grid grid-cols-3 gap-4 mb-4",children:[e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Date of repayment"}),e.jsx("input",{type:"date",value:y,onChange:m,className:`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none ${v?"border-red-500":""}`}),v&&e.jsx("p",{className:"text-red-500 mt-1",children:v})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Customer name"}),e.jsx("input",{type:"text",value:n.customerName,readOnly:!0,className:"w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none"})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Repayment amount"}),e.jsx("input",{type:"number",onChange:S,placeholder:`Maximum repay amount: ₹${g}`,className:`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none ${A?"border-red-500":""}`}),!A&&e.jsxs("p",{className:"text-red-500",children:["Due Amount ₹",g]}),A&&e.jsx("p",{className:"text-red-500 mt-1",children:A})]}),e.jsxs("div",{className:"col-span-2 md:col-span-1",children:[e.jsx("label",{className:"block mb-2",children:"Payment method"}),e.jsxs("select",{value:k,onChange:$,className:`w-full px-3 py-2 bg-gray-700 rounded-md focus:outline-none ${b?"border-red-500":""}`,children:[e.jsx("option",{value:"",children:"How did you pay?"}),e.jsx("option",{value:"UPI",children:"UPI"}),e.jsx("option",{value:"Cash",children:"Cash"}),e.jsx("option",{value:"Card",children:"Card"})]}),b&&e.jsx("p",{className:"text-red-500 mt-1",children:b})]})]}),e.jsxs("div",{className:"flex justify-end space-x-4",children:[e.jsx("button",{type:"button",className:"px-4 py-2 bg-gray-600 rounded-md",onClick:N,children:"Cancel"}),e.jsx("button",{type:"submit",className:"px-4 py-2 bg-teal-400 text-gray-900 rounded-md",children:"Save"})]})]})]})}):null},I=({customer:x,onClose:N})=>{const[n,o]=r.useState([{description:"",amount:"",reference:""}]),[u,y]=r.useState(0),[f,k]=r.useState(""),E=new Date,A={timeZone:"Asia/Kolkata"},d=E.toLocaleDateString("en-CA",A),[v,P]=r.useState(d),[b,p]=r.useState({}),g=l=>{P(l.target.value)},S=(l,a,h)=>{const t=[...n];t[l][a]=h,o(t),m(t)},m=l=>{const a=l.reduce((h,t)=>h+(parseFloat(t.amount)||0),0);y(a)},$=()=>{o([...n,{description:"",amount:"",reference:""}])},F=l=>{const a=n.filter((h,t)=>t!==l);o(a),m(a)},j=()=>{let l={};return f.trim()||(l.vehicleNumber="Vehicle number is required."),n.forEach((a,h)=>{a.description.trim()||(l[`description-${h}`]="Description is required."),(!a.amount||isNaN(a.amount)||parseFloat(a.amount)<=0)&&(l[`amount-${h}`]="Amount must be a positive number."),a.reference.trim()||(l[`reference-${h}`]="Reference is required.")}),p(l),Object.keys(l).length===0},C=async()=>{if(j()){const l={date:v,vehicleNumber:f.toUpperCase(),workRows:n,creditAmount:u,phoneNumber:x.phoneNumber,_id:x._id},a=await V.addCredit(l);a.error?_("error!",a.message,"error"):(_("Success!","Credite added successfully!","success"),onclose()),console.log("Form submitted:",{date:v,vehicleNumber:f,workRows:n,creditAmount:u})}};return e.jsx("div",{className:"fixed inset-0 bg-gray-900 bg-opacity-50 flex justify-center items-center",children:e.jsxs("div",{className:"bg-gray-800 text-white p-4 rounded-lg shadow-lg w-11/12 max-w-3xl",children:[e.jsxs("h2",{className:"text-xl mb-2",children:["Add Credit for ",x.customerName]}),e.jsxs("div",{className:"grid grid-cols-3 gap-2 mb-3",children:[e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm mb-1",children:"Date of service"}),e.jsx("input",{type:"date",className:"w-full px-2 py-1 rounded bg-gray-700 text-white",value:v,max:d,onChange:g})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm mb-1",children:"Customer Name"}),e.jsx("input",{type:"text",value:x.customerName,disabled:!0,className:"w-full px-2 py-1 rounded bg-gray-700 text-white"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm mb-1",children:"Phone Number"}),e.jsx("input",{type:"text",value:x.phoneNumber,disabled:!0,className:"w-full px-2 py-1 rounded bg-gray-700 text-white"})]}),e.jsxs("div",{children:[e.jsx("label",{className:"block text-sm mb-1",children:"Vehicle Number"}),e.jsx("input",{type:"text",value:f.toUpperCase,onChange:l=>k(l.target.value),className:"w-full px-2 py-1 rounded bg-gray-700 text-white",placeholder:"Enter Vehicle Number"}),b.vehicleNumber&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:b.vehicleNumber})]})]}),e.jsxs("div",{className:"mb-3",children:[e.jsx("h3",{className:"text-lg mb-2",children:"Work Details"}),e.jsxs("div",{className:"grid grid-cols-[3fr_3fr_3fr_1fr] gap-2 mb-1 font-semibold",children:[e.jsx("div",{children:"Description"}),e.jsx("div",{children:"Amount"}),e.jsx("div",{children:"Reference"}),n.length>1&&e.jsx("div",{children:"Action"})]}),n.map((l,a)=>e.jsxs("div",{className:"grid grid-cols-[3fr_3fr_3fr_1fr] gap-2 mb-1",children:[e.jsxs("div",{children:[e.jsx("input",{type:"text",placeholder:"Work description",className:"px-2 py-1 rounded bg-gray-700 text-white",value:l.description,onChange:h=>S(a,"description",h.target.value)}),b[`description-${a}`]&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:b[`description-${a}`]})]}),e.jsxs("div",{children:[e.jsx("input",{type:"number",placeholder:"Amount",className:"px-2 py-1 rounded bg-gray-700 text-white",value:l.amount,onChange:h=>S(a,"amount",h.target.value)}),b[`amount-${a}`]&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:b[`amount-${a}`]})]}),e.jsxs("div",{children:[e.jsx("input",{type:"text",placeholder:"Reference",className:"px-2 py-1 rounded bg-gray-700 text-white",value:l.reference,onChange:h=>S(a,"reference",h.target.value)}),b[`reference-${a}`]&&e.jsx("p",{className:"text-red-500 text-xs mt-1",children:b[`reference-${a}`]})]}),a>=1&&e.jsx(H,{className:"text-red-500 cursor-pointer self-center",onClick:()=>F(a)})]},a)),e.jsx("button",{className:"bg-teal-400 text-gray-900 px-3 py-1 rounded-md mt-2",onClick:$,children:"Add Field"})]}),e.jsx("div",{className:"mb-3",children:e.jsxs("label",{className:"block text-lg mb-1",children:["Total Credit Amount: ₹",u]})}),e.jsxs("div",{className:"flex justify-end",children:[e.jsx("button",{className:"bg-red-500 text-white px-3 py-1 rounded-md mr-2",onClick:N,children:"Cancel"}),e.jsx("button",{className:"bg-teal-400 text-gray-900 px-3 py-1 rounded-md",onClick:C,children:"Save"})]})]})})},U="data:image/svg+xml,%3csvg%20width='27'%20height='28'%20viewBox='0%200%2027%2028'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M11.5711%2021.2208C6.77768%2021.2208%202.89258%2017.3357%202.89258%2012.5422C2.89258%207.74873%206.77768%203.86362%2011.5711%203.86362C16.3646%203.86362%2020.2497%207.74873%2020.2497%2012.5422C20.2439%2017.3328%2016.3617%2021.215%2011.5711%2021.2208ZM11.5711%205.79219C7.84322%205.79219%204.82115%208.81426%204.82115%2012.5422C4.82115%2016.2701%207.84322%2019.2922%2011.5711%2019.2922C15.2991%2019.2922%2018.3211%2016.2701%2018.3211%2012.5422C18.3173%208.81619%2015.2971%205.79605%2011.5711%205.79219Z'%20fill='%23DCDCDC'/%3e%3cpath%20d='M23.8249%2023.4319L19.7209%2019.3279C19.3092%2019.8226%2018.8521%2020.2796%2018.3574%2020.6914L22.4614%2024.7954C22.8442%2025.1657%2023.4546%2025.1551%2023.8249%2024.7713C24.1856%2024.3971%2024.1856%2023.8051%2023.8249%2023.4319Z'%20fill='%23DCDCDC'/%3e%3cpath%20d='M7.71429%2013.5065C7.182%2013.5065%206.75%2013.0745%206.75%2012.5422C6.75%209.88366%208.91289%207.72076%2011.5714%207.72076C12.1037%207.72076%2012.5357%208.15276%2012.5357%208.68505C12.5357%209.21734%2012.1037%209.64934%2011.5714%209.64934C9.9765%209.64934%208.67857%2010.9473%208.67857%2012.5422C8.67857%2013.0745%208.24657%2013.5065%207.71429%2013.5065Z'%20fill='%23DCDCDC'/%3e%3c/svg%3e",z="data:image/svg+xml,%3csvg%20width='26'%20height='26'%20viewBox='0%200%2026%2026'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20d='M12.071%2013.9286C9.44872%2013.9286%207.12265%2014.521%205.59422%2015.0364C4.46601%2015.418%203.71387%2016.4812%203.71387%2017.6726L3.71387%2021.3571C3.71387%2021.3571%2012.9606%2021.3571%2012.9996%2021.3571'%20stroke='white'%20stroke-width='1.47'%20stroke-miterlimit='10'/%3e%3cpath%20d='M12.0716%2013.9286C9.50778%2013.9286%207.42871%2010.9209%207.42871%208.35714V7.42857C7.42871%204.86479%209.50778%202.78571%2012.0716%202.78571C14.6354%202.78571%2016.7144%204.86479%2016.7144%207.42857L16.7144%208.35714C16.7144%2010.9209%2014.6354%2013.9286%2012.0716%2013.9286Z'%20stroke='white'%20stroke-width='1.47'%20stroke-miterlimit='10'%20stroke-linecap='square'/%3e%3cpath%20d='M19.5%2016.7143L19.5%2022.2857'%20stroke='white'%20stroke-width='1.47'%20stroke-miterlimit='10'%20stroke-linecap='square'/%3e%3cpath%20d='M16.7139%2019.5L22.2853%2019.5'%20stroke='white'%20stroke-width='1.47'%20stroke-miterlimit='10'%20stroke-linecap='square'/%3e%3c/svg%3e",G=({isOpen:x,onClose:N,vehicleNumbers:n})=>x?e.jsx("div",{className:"fixed inset-0 bg-black bg-opacity-50 flex justify-center items-center z-50",children:e.jsxs("div",{className:"bg-white p-6 rounded-md w-96 max-w-full",children:[e.jsx("h2",{className:"text-lg font-semibold mb-4",children:"Vehicle Numbers"}),e.jsx("ul",{className:"list-disc pl-5",children:n.map((o,u)=>e.jsx("li",{className:"text-gray-800",children:o},u))}),e.jsx("button",{className:"mt-4 bg-blue-300 text-white px-4 py-2 rounded-md",onClick:N,children:"Close"})]})}):null,K=()=>{const[x,N]=r.useState(!1),[n,o]=r.useState(!1),[u,y]=r.useState(null),[f,k]=r.useState(!1),[E,A]=r.useState(""),[d,v]=r.useState(!1),[P,b]=r.useState([]),[p,g]=r.useState(1),S=10,[m,$]=r.useState(!1),[F,j]=r.useState([]),C=s=>{j(s),$(!0)};r.useEffect(()=>{(async()=>{try{const w=await V.showCustomers();b(w.data),console.log("Customer history",w.data)}catch(w){console.error("Error fetching income history data",w)}})()},[x,f,d]);const l=(s,w)=>s-w,a=s=>{y(s),o(!0)},h=()=>{o(!1),y(null)},t=s=>{y(s),k(!0)},c=()=>{k(!1),y(null)},i=s=>{y(s),v(!0)},D=()=>{v(!1),y(null)},R=()=>{$(!1)},M=Math.ceil(P.length/S),q=P.filter(s=>{const w=s.customerName.toLowerCase(),W=s.phoneNumber?String(s.phoneNumber):"";return w.includes(E.toLowerCase())||W.includes(E)}),L=q.slice((p-1)*S,p*S);return e.jsxs("div",{className:"bg-gray-900 min-h-screen p-10",children:[e.jsxs("div",{className:"container p-6 mx-auto",children:[e.jsxs("div",{className:"flex justify-between items-center mb-4",children:[e.jsx("h1",{className:"text-3xl font-bold text-teal-400",children:"Customer Data"}),e.jsxs("div",{className:"flex items-center space-x-4",children:[e.jsx("div",{className:"bg-[#00BDD6] bg-opacity-10 px-2 border border-[#00BDD6] rounded-lg",children:e.jsxs("div",{className:"flex flex-row",children:[e.jsx("img",{src:U,alt:""}),e.jsx("input",{type:"text",placeholder:"Search customer...",className:"w-64 h-10 px-3 rounded bg-transparent text-white outline-none",onChange:s=>A(s.target.value)})]})}),e.jsxs("button",{className:"flex flex-row bg-[#00A1B7] text-white font-semibold gap-1 px-4 py-2 rounded-md",onClick:()=>N(!0),children:[e.jsx("img",{src:z,alt:""}),"New Customer"]})]})]}),e.jsx("div",{className:"overflow-x-auto p-2",children:e.jsxs("table",{className:"table-auto w-full text-left text-gray-300",children:[e.jsx("thead",{children:e.jsxs("tr",{className:"bg-gray-800",children:[e.jsx("th",{className:"px-4 py-2",children:"Date"}),e.jsx("th",{className:"px-4 py-2",children:"Name"}),e.jsx("th",{className:"px-4 py-2",children:"Vehicle number"}),e.jsx("th",{className:"px-4 py-2",children:"Phone number"}),e.jsx("th",{className:"px-4 py-2",children:"Credit amount"}),e.jsx("th",{className:"px-4 py-2",children:"Paid amount"}),e.jsx("th",{className:"px-4 py-2",children:"Due amount"}),e.jsx("th",{className:"px-4 py-2",children:"Credit / Repayment"}),e.jsx("th",{className:"px-4 py-2",children:"History"})]})}),e.jsxs("tbody",{className:"bg-gray-700",children:[L.map((s,w)=>e.jsxs("tr",{className:"border-t border-gray-600",children:[e.jsx("td",{className:"px-4 py-2",children:new Date(s.dateOfService).toLocaleDateString("en-GB")}),e.jsx("td",{className:"px-4 py-2",children:s.customerName}),e.jsx("td",{className:"px-4 py-2",children:e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("p",{children:[" ",s.vehicleNumber[0]]}),e.jsx("p",{children:s.vehicleNumber.length>1&&e.jsx("p",{className:"text-blue-600 cursor-pointer",onClick:()=>C(s.vehicleNumber),children:"more"})})]})}),e.jsx("td",{className:"px-4 py-2",children:s.phoneNumber}),e.jsxs("td",{className:"px-4 py-2",children:["₹",s.creditAmount]}),e.jsxs("td",{className:"px-4 py-2",children:["₹",s.paidAmount]}),e.jsxs("td",{className:"px-4 py-2",children:["₹",l(s.creditAmount,s.paidAmount)]}),e.jsxs("td",{className:"px-4 py-2",children:[e.jsx("button",{className:"bg-yellow-400 text-gray-900 px-4 py-1 rounded-md",onClick:()=>i(s),children:"Credit"}),e.jsx("button",{className:"bg-teal-400 text-gray-900 px-4 py-1 rounded-md ml-2",onClick:()=>t(s),children:"Pay"})]}),e.jsx("td",{className:"px-4 py-2",children:e.jsx("button",{className:"bg-gray-600 text-gray-300 px-4 py-1 rounded-md",onClick:()=>a(s),children:"See history"})})]},w)),q.length===0&&e.jsx("tr",{children:e.jsx("td",{colSpan:"9",className:"text-center pt-6 font-medium",children:"No Credit Customers..."})})]}),m&&e.jsx("div",{})]})}),q.length>0&&M>1&&e.jsxs("div",{className:"flex justify-between items-center mt-4",children:[e.jsxs("p",{className:"text-gray-400",children:["Page ",p," of ",M]}),e.jsxs("div",{className:"flex space-x-2",children:[p>1&&e.jsx("button",{className:"px-3 py-1 rounded bg-gray-800 text-gray-300",onClick:()=>g(p-1),children:"Previous"}),Array.from({length:M},(s,w)=>w+1).map(s=>e.jsx("button",{className:`px-3 py-1 rounded ${s===p?"bg-teal-400 text-gray-900":"bg-gray-800 text-gray-300"}`,onClick:()=>g(s),children:s},s)),p<M&&e.jsx("button",{className:"px-3 py-1 rounded bg-gray-800 text-gray-300",onClick:()=>g(p+1),children:"Next"})]})]})]}),u&&f&&e.jsx(Z,{show:f,onClose:c,customer:u}),u&&n&&e.jsx(B,{show:n,onClose:h,customer:u}),x&&e.jsx(T,{show:x,onClose:()=>N(!1)}),u&&d&&e.jsx(I,{show:d,customer:u,onClose:D}),e.jsx(G,{isOpen:m,onClose:R,vehicleNumbers:F})]})},ee=()=>e.jsxs(e.Fragment,{children:[e.jsx(O,{}),e.jsx(K,{})]});export{ee as default};
