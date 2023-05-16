import "../AddAdvertisement/AddAdvertisement.css"
import React, { useState, useEffect } from "react";
import axios from "axios";
import { ToastContainer, toast } from "react-toastify";
import 'react-toastify/dist/ReactToastify.css';
import { useNavigate, useLocation } from "react-router-dom";

export default function AddAdvertisement() {

  const [name, setName] = useState("");
  const [category, setCategory] = useState("");
  // const [image, setImage] = useState('');
  const [price, setPrice] = useState("");
  const [weight, setWeight] = useState("");
  const [stock, setStock] = useState("");
  const [description, setDesc] = useState("");

  console.log()

  const navigate = useNavigate();
  const addAd = async (data) => {
    const response = await axios.post("http://localhost:8070/ad/", data);
    console.log(await response.json())
  }


  function sendData(e) {
    e.preventDefault();


    const newAd = {
      name,
      category,
      // image,
      price,
      weight,
      stock,
      description,
      date: new Date()
    }
    notify();

    //alert box-------------------------------------------------------------------------------------

    const formData = new FormData()
    formData.append('name', name)
    formData.append('category', category)
    // formData.append('image', image)
    formData.append('price', price)
    formData.append('weight', weight)
    formData.append('stock', stock)
    formData.append('description', description)

    axios.post("http://localhost:8070/ad/add", newAd).then(() => {

      window.location.href = `/SellerHome`

    }).catch((err) => {
      alert(err)
    })

    if (name || category || price || weight || stock) {
      toast.success('Advertisement Added Successfully', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }

  }
  async function notify() {

    if (!name || !category || !price || !weight || !stock) {
      toast.error('Fill The Form Correctly!!!', {
        position: "top-right",
        autoClose: 2000,
        hideProgressBar: true,
        closeOnClick: true,
        pauseOnHover: true,
        draggable: true,
        progress: undefined,
        theme: "colored",
      });
    }
  }

  return (
    <>
      <div className="AddAdvertisment">
        <div className="form createForm" id="createForm">
          <form onSubmit={sendData} encType='multipart/form-data'>
            <div className='py-4 CreataFormData'>
              <div className='container' id="MPbackg">
                <div className='card-header MPCreateFormHead' id="MPcformhead">
                  <h4><b>Add Product To Market</b></h4>
                </div>
                <div className='row'>
                  <div className=''>
                    <div className='card MPCreataFormData1'>

                      <div className='card-body'>

                        <div className='row'>
                          <div className='col-md-12'>
                            <label for="MformName" className="form-label M_AddFormName">Product Name</label>
                            <input type="text" className="form-control M_AddFormNameInput" placeholder="Barbell" onChange={(e) => {
                              setName(e.target.value);
                            }} required>

                            </input><br />
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group mb-3'>
                              <label for="MformCategory" className="form-label M_AddFormCat">Product Category</label>
                              <select class="form-select M_AddFormCatSelect" onChange={(e) => {
                                setCategory(e.target.value);
                              }} required>
                                <option>Select</option>
                                <option>Home Fitness</option>
                                <option>Commercial Fitness</option>
                                <option>Outdoor Fitness</option>
                              </select>
                            </div>
                          </div>
                          &nbsp;&nbsp;&nbsp;&nbsp;
                          <div className='col-md-5'>
                            <div className='form-group mb-3'>
                              <label for="MformCategory" className="form-label M_AddFormImg">Product Image</label>&nbsp;&nbsp;&nbsp;&nbsp;
                              <input type="file" multiple />
                            </div>
                          </div>
                          {/* <!-- Add a hidden input field for the date field --> */}
                          <input type="hidden" name="date" value="<%= new Date().toISOString() %>" />
                          <div className='col-md-4'>
                            <div className='form-group mb-3'>
                              <label for="MformPrice" className="form-label M_AddFormPrice">Price (LKR)</label>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <input type="number" className="form-control M_AddFormPriceInput" onChange={(e) => {
                                setPrice(e.target.value);
                              }} required></input>
                            </div>
                          </div>

                          <div className='col-md-4'>
                            <div className='form-group mb-3'>
                              <label for="MformWeight" className="form-label M_AddFormWeight">Product Weight</label>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <input type="number" className="form-control M_AddFormWeightInput" onChange={(e) => {
                                setWeight(e.target.value);
                              }} required></input>
                            </div>
                          </div>
                          <div className='col-md-4'>
                            <div className='form-group mb-3'>
                              <label for="MformStock" className="form-label M_AddFormStock">Product Stock In Hand</label>
                              &nbsp;&nbsp;&nbsp;&nbsp;
                              <input type="number" className="form-control M_AddFormStockInput" onChange={(e) => {
                                setStock(e.target.value);
                              }} required></input>
                            </div>
                          </div>

                          <div className='col-md-11'>
                            <div className='form-group mb-3'>
                              <label for="MformDesc" className="M_AddFormDesc">Product Description</label><br />

                              <textarea className="M_AddFormDescInput" onChange={(e) => {
                                setDesc(e.target.value);
                              }}></textarea>
                            </div>
                          </div>
                          <div class="mb-3 Mform-check">
                            <div class="form-check">
                              <input className="form-check-input M_AddFormCheck" type="checkbox" required></input>
                              <label className="form-check-label M_AddFormCheck" for="MFormCheck">
                                I accept the Terms And Conditions
                              </label>
                            </div>

                          </div>

                          <div className='col-md-12'>
                            <button type="button" class="MFormCancelBtn btn btn-secondary" onClick={(e) => {
                              e.preventDefault();
                              window.location.href = `/SellerHome`;
                            }}>Cancel</button>
                            &nbsp;&nbsp;&nbsp;&nbsp;
                            <button type="submit" class="MFormSubmitBtn btn btn-primary" id="MFormSubmitBtn" onClick={notify}>Submit</button>
                          </div>
                        </div>
                      </div>
                    </div>
                  </div>


                </div>

              </div>

            </div>
            <ToastContainer />
          </form>
        </div>
      </div>
    </>

  )

}