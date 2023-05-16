import React, { useState, useEffect } from 'react';
import { useNavigate, useParams } from "react-router-dom";
import axios from 'axios';
import './ProductView.css';
import { useCart } from "react-use-cart";

const ProductView = () => {


    const { addItem } = useCart();

    let [number, setNumber] = useState(0)

    function increment() {
        if (number < stock) {
            setNumber(++number)
        }
    }

    function decrement() {
        if (number > 1) {
            setNumber(--number)
        }
    }

    useEffect(() => {
        setNumber(1);
    }, [])

    const [name, setName] = useState("");
    const [category, setCategory] = useState("");
    const [price, setPrice] = useState("");
    const [weight, setWeight] = useState("");
    const [stock, setStock] = useState("");
    const [description, setDesc] = useState("");
    const params = useParams();

    // const qty = CounterFunction();

    const [data, setData] = useState([]);

    useEffect(() => {
        getAds();
    }, [])

    const getAds = async () => {
        const response = await axios.get("http://localhost:8070/ad/");
        if (response.status === 200) {
            setData(response.data);
        }
    };

    const navigate = useNavigate();

    useEffect(() => {
        getAdvertisementDetails();
    }, [])

    const getAdvertisementDetails = async () => {

        let result = await fetch(`http://localhost:8070/ad/get/${params.id}`);
        result = await result.json();

        console.warn(result);
        setName(result.advertisement.name);
        setCategory(result.advertisement.category);
        setPrice(result.advertisement.price);
        setWeight(result.advertisement.weight);
        setStock(result.advertisement.stock);
        setDesc(result.advertisement.description);
    }

    function handleBuyNow() {
        navigate(`/checkout/${params.id}?quantity=${number}`);


    }

    return (
        <>
            <div>
                <button className="btn btn-success backto" onClick={(e) => { e.preventDefault(); window.location.href = `/buyer`; }} >Back</button>

            </div>

            <div>
                <div>
                    <div>
                        <div className="form createForm" id="createForm" >

                            <div className='py-4 CreataFormData'>
                                <div className='container' id="MPbackg1">
                                    <div id='pdctVImg'>
                                        <img src="..." className="card-img-top pdctVImg" />
                                    </div>
                                    <div className='pdctAllInfo'>

                                        <h4 className="card-title PrdctVName">{name}</h4>
                                        <p className="card-text PrdctVdata">Price : <span id='PrdctVdata1'>Rs.{price} LKR</span></p>
                                        <p className="card-text PrdctVdata">Weight : {weight}kg</p>
                                        <p className="card-text PrdctVdata">Quantity  : </p>
                                        <div class="wrapper">
                                            <span class="minus" onClick={e => decrement()}>-</span>
                                            <span type="number" class="num" onChange={(e) => setNumber(e.target.value)}>{number}</span>
                                            <span class="plus" onClick={e => increment()}>+</span>
                                        </div>
                                        <p className="card-text PrdctStockdata">Stock : {stock}</p>

                                        {/* <p className="card-text PrdctVdata">Quantity:
                                        <div>
                                            <input type="number" className="form-control num" value={number}
                                                onChange={(e)=>setNumber(e.target.value)} 
                                            ></input>
                                            <button className='' onClick={e =>decrement()}>-</button>
                                            <button onClick={e =>increment()}>+</button>
                                        </div>
                                    </p> */}
                                        <div>
                                            <div>
                                                <button className='btn btn-success MpdctBuyBTN' onClick={handleBuyNow} >Buy Now</button>
                                            </div>
                                            <div>
                                                <button className='btn btn-success MpdctCartBTN' onClick={() => addItem} >Add To Cart</button>
                                            </div>
                                        </div>
                                    </div>
                                </div><br></br>
                                <div className='container pdctDescCard' id="MPbackg2">
                                    <div className='pdctAllInfo2'>
                                        <p className="card-text PrdctMVDesc">Product Description</p>
                                        <p className="card-text PrdctMVDescData">{description}</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ProductView