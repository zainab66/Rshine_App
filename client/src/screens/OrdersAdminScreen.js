import React, { useEffect ,useState} from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { listOrderCustmer,updateOrder } from '../actions/orderActions';
import LoadingBox from '../components/LoadingBox';
import MessageBox from '../components/MessageBox';

import { ProgressBar, Button } from 'react-bootstrap';
import 'bootstrap/dist/css/bootstrap.min.css';





export default function OrdersAdminScreen(props) {
    const orderCustmer = useSelector((state) => state.orderCustmer);
    const { loading, error, CustomerOrders } = orderCustmer;
    const [type, setType] = useState("");
    const dispatch = useDispatch();

    useEffect(() => {
        dispatch(listOrderCustmer());
    }, [dispatch]);

console.log("ppp",CustomerOrders)
    const onOrderUpdate = (orderId) => {
        const payload = {
          orderId,
          type,
        };
        dispatch(updateOrder(payload));
      };
    return (

        <div className="categoryAdminScreen">
            <div class="container px-1 px-md-4 py-5 mx-auto">
            {loading ? (
         <LoadingBox></LoadingBox>
       ) : error ? (
         <MessageBox variant="danger">{error}</MessageBox>
       ) : (<>
           {CustomerOrders.map((orderItem) => (

    <div class="card">
        <div class="row d-flex justify-content-between px-3 top">
            <div class="d-flex">
                <h5>ORDER_ID: <span class="text-info font-weight-bold">{orderItem._id}</span></h5>
            </div>
            <div class="d-flex flex-row text-sm-right">
               <div className="u mr-4">
                
                <select class="custom-select mr-4" id="" onChange={(e) => setType(e.target.value)}>
                              <option value={""}>select status</option>
                {orderItem.orderStatus.map((status) => {
                   return (
                     <>
                       {!status.isCompleted ? (
                         <option  key={status.type} value={status.type}>
                           {status.type}
                         </option>
                       ) : null}
                     </>
                   );
                 })}
                            </select>
                            </div>
                    
                    <button type="button" class="btnForAll  btn-block waves-effect waves-light"  onClick={() => onOrderUpdate(orderItem._id)}>
                confirm
              </button>
            </div>
        </div> 
        {orderItem.items.map((item) => (
        <div class="row justify-content-between top">
            <div class="row d-flex icon-content"> 
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Items<br/>{item.name}</p>
                </div>
            </div>
          
            <div class="row d-flex icon-content"> 
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Payment Status<br/>{orderItem.paymentStatus}</p>
                </div>
            </div>
            <div class="row d-flex icon-content"> 
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Total Price<br/>{orderItem.totalPrice}</p>
                </div>
            </div>
        </div> 
        ))}
        <div class="row d-flex justify-content-center">
            <div class="col-12">
                <ul id="progressbar" class="text-center">
                {orderItem.orderStatus.map((status) => (<>
                    <li class={`step0 ${
                    status.isCompleted ? "active" : ""
                  }`}></li>
                 
                  </>
                 ))}
                </ul>
            </div>
        </div>
       
     <div class="row justify-content-between top">
            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/9nnc9Et.png"/>
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br/>Processed</p>
                </div>
            </div>
            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/GiWFtVu.png"/>
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br/>Packed</p>
                </div>
            </div>
            <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/u1AzR7w.png"/>
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br/>Shipped</p>
                </div>
            </div> 
            {/* <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/TkPm63y.png"/>
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br/>En Route</p>
                </div>
            </div> */}
             <div class="row d-flex icon-content"> <img class="icon" src="https://i.imgur.com/HdsziHP.png"/>
                <div class="d-flex flex-column">
                    <p class="font-weight-bold">Order<br/>Arrived</p>
                </div>
            </div>
        </div> 
    </div>
           ))}</>)}
   
</div>
      
        </div>


  );
};






























// <div className="categoryAdminScreen">


//       <div className="container">
//         <div class="row">

//           <div class="col-5">
//               <h2 className="categoryTittle">ORDER_ID:{orderItem._id}</h2> 
//               <div
//             style={{
//               boxSizing: "border-box",
//               padding: "100px",
//               display: "flex",
//               alignItems: "center",
//             }}
//           >
//           <div className="orderTrack">
//           {loading ? (
//         <LoadingBox></LoadingBox>
//       ) : error ? (
//         <MessageBox variant="danger">{error}</MessageBox>
//       ) : (<>
//           {orders.map((orderItem) => (

//             <div className="orderStatus">
//               <div className="point"></div>
//               <div className="orderInfo">
//                 <div className="status">Ordered</div>
//                 <div className="date">Fri, 2020</div>
//               </div>
//             </div>
//             <div className="orderStatus">
//               <div className="point"></div>
//               <div className="orderInfo">
//                 <div className="status"></div>
//                 <div className="date">Fri, 2020</div>
//               </div>
//             </div>
//             <div className="orderStatus">
//               <div className="point"></div>
//               <div className="orderInfo">
//                 <div className="status">Shipped</div>
//                 <div className="date">Fri, 2020</div>
//               </div>
//             </div>
//             <div className="orderStatus">
//               <div className="point"></div>
//               <div className="orderInfo">
//                 <div className="status">Delivered</div>
//                 <div className="date">Fri, 2020</div>
//               </div>
//             </div>
//             ))}</>)} 
//           </div>
//          </div>



//  {/* select input to apply order action */}
//  <div
//               style={{
//                 padding: "0 50px",
//                 boxSizing: "border-box",
//               }}
//             >
//               <select >
//                 <option value={""}>select status</option>
//                 {orderItem.orderStatus.map((status) => {
//                   return (
//                     <>
//                       {!status.isCompleted ? (
//                         <option key={status.type} value={status.type}>
//                           {status.type}
//                         </option>
//                       ) : null}
//                     </>
//                   );
//                 })}
//               </select>
//             </div>
//             {/* button to confirm action */}

//             <div
//               style={{
//                 padding: "0 50px",
//                 boxSizing: "border-box",
//               }}
//             >
//               <button >
//                 confirm
//               </button>
// </div>
// </div>
// </div>

// </div>
//     )
// }
