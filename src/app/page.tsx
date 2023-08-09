
'use client'
import { api } from "@/services/api";
import { useState } from "react";
import Image from 'next/image';
import styles from '../../src/styles/Home.module.css';
import { useRouter } from 'next/navigation';
import { useSearchParams } from 'next/navigation'


export default function Home() {
  const searchParams = useSearchParams()
  console.log(searchParams)
  const router = useRouter();

  const changeQuantity = (value: number) => {
    // Não permita a quantidade menor que 0, se a quantidade for maior que o valor inserido pelo usuário, a quantidade inserida pelo usuário será usada, caso contrário, 0
    setItem({ ...item, quantity: Math.max(0, value) });
  };
  
  const onInputChange = (e: any) => {
    changeQuantity(parseInt(e.target.value));
};

  const onQuantityPlus = () => {
    changeQuantity(item.quantity + 1);
  };
  
  const onQuantityMinus = () => {
    changeQuantity(item.quantity - 1);
  };

  const [item, setItem] = useState({
    name: 'Apple AirPods',
    description: 'Latest Apple AirPods.',
    image:
    '/fones.jpg',
    quantity: 0,
    price: 999,
  });

  async function checkout(){ 
    try {
      api.post('/api/checkout').then(response => {
        window.location.href = response.data
      })    
    } catch (error) {
      console.log(error)
    }     
  }

  return(
    <div className={styles.container}>
      <main>
        <div className='shadow-lg border rounded p-2 '>
          <Image src={item.image} width={300} height={150} alt={item.name} />
          <h2 className='text-2xl'>$ {item.price}</h2>
          <h3 className='text-xl'>{item.name}</h3>
          <p className='text-gray-500'>{item.description}</p>
          <p className='text-sm text-gray-600 mt-1'>Quantity:</p>
          <div className='border rounded'>
            <button
              onClick={onQuantityMinus}
              className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
            >
              -
            </button>
            <input
              type='number'
              className='p-2'
              onChange={onInputChange}
              value={item.quantity}
            />
            <button
              onClick={onQuantityPlus}
              className='bg-blue-500 py-2 px-4 text-white rounded hover:bg-blue-600'
            >
              +
            </button>
          </div>
        <p>Total: ${item.quantity * item.price}</p>
       <button
         onClick={()=> checkout()}
         disabled={item.quantity === 0}
         className='bg-blue-500 hover:bg-blue-600 text-white block w-full py-2 rounded mt-2 disabled:cursor-not-allowed disabled:bg-blue-100'
       >
         Buy
       </button>
      </div>
      </main>
    </div>
    )
}