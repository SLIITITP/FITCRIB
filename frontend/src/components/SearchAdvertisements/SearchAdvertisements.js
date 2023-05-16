import { FaCartPlus } from "react-icons/fa"
import "../SearchAdvertisements/SearchAdvertisements.css"
import { React, useEffect, useState } from 'react';
import { useCart } from "react-use-cart";
import { Link } from 'react-router-dom'
import { Box, Button, Stack, TextField, Typography } from '@mui/material';
import axios from "axios";

function SearchAdvertisements(props) {

  const [search, setSearch] = useState("");
  const [data, setData] = useState("");
  const [cartsVisibility, setCartVisibile] = useState(false);
  const [productsInCart, setProducts] = useState([]);

  const handleClick = (item) => {
    console.log(item);
  };

  console.log(search)

  useEffect(() => {
    getAds();
  }, [])

  const getAds = async () => {
    const response = await axios.get("http://localhost:8070/ad/");
    if (response.status === 200) {
      setData(response.data);
    }
  };

  return (
    <>
      <div className="SearchAdvertisements">
        <button className="btn btn-success MPbackto" onClick={(e) => { e.preventDefault(); window.location.href = `/SellerHome`; }} >Back To Seller</button>
        <button className="btn btn-success MPbackto" onClick={(e) => { e.preventDefault(); window.location.href = `/orders`; }} >Orders</button>
        <Stack alignItems={"center"} mt={"37px"} justifyContent={"center"} p={"20px"}>
          <Typography fontWeight={700} sx={{ fontSize: { LG: '44px', xs: '30px' } }} mb={"50px"} textAlign={"center"} color={"#99FF33"}>
            Equipments in The Marketplace
          </Typography>

          <Box position={"relative"} mb={"72px"}>
            <TextField
              sx={{
                input: { fontWeight: '700', border: 'none', borderRadius: '4px' },
                width: { lg: '800px', xs: '350px' },
                backgroundColor: '#fff',
                borderRadius: '10px'
              }}
              height="76px" value={search} onChange={(e) => setSearch(e.target.value.toLowerCase())} placeholder='Search Equipments' type='text' />
            {/* <Button className="search-btn"
                    sx={{
                        backgroundColor: '#FF2625',
                        color: "#fff",
                        textTransform: 'none',
                        width: { lg: '175px', xs: '80px' },
                        fontSize: { lg: '20px', xs: '14px' },
                        height: '56px',
                        position: "absolute",
                        right: '0'
                    }}
                    onClick={handleSearch}
                >Search</Button> */}

            <button className="btn shopping-cart-btn" id="cart" onClick={(e) => {
              e.preventDefault();
              window.location.href = `/cart`;
            }}>
              <FaCartPlus />
            </button>
          </Box>
        </Stack>
        <div className="MBuyerViewcardSet">
          {data &&
            data
              .filter((item) => item.name.toLowerCase().includes(search))
              .map((item, index) => (
                <div className="row mb-3 MProw" key={index} >
                  <div className="col-md-4 MPcard1">
                    <div className="h-100 MPcard2" >

                      <div className="card-body1" onClick={(e) => {
                        e.preventDefault();
                        window.location.href = `/getProduct/${item._id}`;
                      }}>
                        <div>
                          <img src="" alt="..."></img>
                          <hr></hr>
                          <div className='MPSearchCardDetls'>
                            <h5 className="card-title MPsearchCName">{item.name}</h5>
                            <p className="card-text MPsearchCWeight">Weight : <span id="searchCWeightnum"> {item.weight} kg</span></p>
                            <p className="card-text MPsearchCPrice">Price : <span id="searchCPricenum">{item.price}.00 LKR</span></p>
                            {/* <p className="card-text">Ratings:</p> */}
                          </div>
                        </div>
                      </div>

                      <div>
                        <a className="btn btn-success MPsearchACart" >Add To Cart</a>
                      </div>
                    </div>
                  </div>
                </div>
              ))}
        </div>
      </div>

    </>
  )
}

export default SearchAdvertisements