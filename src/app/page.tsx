// import Image from 'next/image';
// import styles from '../../src/styles/Home.module.css';
// import { useState } from 'react';

'use client'
import { api } from "@/services/api";
import { useEffect, useState } from "react";

// export default function Home() {

//   const changeQuantity = (value: number) => {
//     // Não permita a quantidade menor que 0, se a quantidade for maior que o valor inserido pelo usuário, a quantidade inserida pelo usuário será usada, caso contrário, 0
//     setItem({ ...item, quantity: Math.max(0, value) });
//   };
  
//   const onInputChange = (e: any) => {
//     changeQuantity(parseInt(e.target.value));
// };

//   const onQuantityPlus = () => {
//     changeQuantity(item.quantity + 1);
//   };
  
//   const onQuantityMinus = () => {
//     changeQuantity(item.quantity - 1);
//   };

//   const [item, setItem] = useState({
//     name: 'Apple AirPods',
//     description: 'Latest Apple AirPods.',
//     image:
//       'https://images.unsplash.com/photo-1572569511254-d8f925fe2cbb?ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&ixlib=rb-1.2.1&auto=format&fit=crop&w=1400&q=80',
//     quantity: 0,
//     price: 999,
//   });

//   return (
//     <div className={styles.container}>
//       <main>
//         <div className='shadow-lg border rounded p-2 '>
//           <Image src={item.image} width={300} height={150} alt={item.name} />
//           <h2 className='text-2xl'>$ {item.price}</h2>
//           <h3 className='text-xl'>{item.name}</h3>
//           <p className='text-gray-500'>{item.description}</p>
//           <p className='text-sm text-gray-600 mt-1'>Quantity:</p>
//           <div className='border rounded'>
//             <button
//               onClick={onQuantityMinus}
//               className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
//             >
//               -
//             </button>
//             <input
//               type='number'
//               className='p-2'
//               onChange={onInputChange}
//               value={item.quantity}
//             />
//             <button
//               onClick={onQuantityPlus}
//               className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
//             >
//               +
//             </button>
//           </div>
//         <p>Total: ${item.quantity * item.price}</p>
//        <button
//          disabled={item.quantity === 0}
//          className='bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-100'
//        >
//          Buy
//        </button>
//       </div>
//     </main>
//   </div>
//   );
// }

async function testeAPI(){ 
  
  api.post('/create-checkout-session').then(response => {
    console.log(response)
  })

  console.log('testeAPI')
   
}

const ProductDisplay = () => (
  <section>
    <div className="product">
      <img
        src="https://i.imgur.com/EHyR2nP.png"
        alt="The cover of Stubborn Attachments"
      />
      <div className="description">
      <h3>Stubborn Attachments</h3>
      <h5>$20.00</h5>
      </div>
    </div>
    {/* <form action="/create-checkout-session" method="POST"> */}
      <button type="submit" onClick={ ()=> testeAPI() }>
        Checkout
      </button>
    {/* </form> */}
  </section>
);


const Message = ({ message }: any) => (
  <section>
    <p>{message}</p>
  </section>
);

export default function App() {
  const [message, setMessage] = useState("");

  useEffect(() => {
    // Check to see if this is a redirect back from Checkout
    const query = new URLSearchParams(window.location.search);

    if (query.get("success")) {
      setMessage("Order placed! You will receive an email confirmation.");
    }

    if (query.get("canceled")) {
      setMessage(
        "Order canceled -- continue to shop around and checkout when you're ready."
      );
    }
  }, []);

  return message ? (
    <Message message={message} />
  ) : (
    <ProductDisplay />
  );
}