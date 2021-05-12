// import React, { useState } from 'react';

// export default function CartItem(props) {

//     const [qty, setQty] = useState(props.cartItem.quantity);

//     const { _id } = props.cartItem;

//     const onQuantityIncrement = () => {
//         setQty(qty + 1);
//         props.onQuantityInc(_id, qty + 1);
//     };

//     const onQuantityDecrement = () => {
//         if (qty <= 1) return;
//         setQty(qty - 1);
//         props.onQuantityDec(_id, qty - 1);
//     };


//     return (
//         //     <div className="quantityControl">
//         //     <button  class="minus" onClick={onQuantityDecrement}>-</button>
//         //     <input value={qty} readOnly />
//         //     <button onClick={onQuantityIncrement}>+</button>
//         //   </div>

//         <div class="quantity buttons_added">
//             <input type="button" value="-" class="minus" onClick={onQuantityDecrement} />
//             <input type="number" name="quantity" value={qty} title="Qty" class="input-text qty text" size="4" pattern="" inputmode="" readOnly />
//             <input type="button" value="+" class="plus" onClick={onQuantityIncrement} />
//         </div>



//     )
// }







