import React from 'react'
import '../../css/root.css'
import Sidebar from '../../sidebar/Sidebar'

const PlaceOrderPage = () => {
    

    return (
        <div className='main-container'>
            <Sidebar />

            <div className="content">
                <div className="content-wrapper">


                    <h1 style={{ textAlign: 'left' }}>Order Form</h1>
                    <br />
                    <br />

                    <div className="mask d-flex align-items-center h-100 ">
                        <div className="container h-100">
                            <div className="row d-flex justify-content-center align-items-center h-100">
                                <div className="col-12 col-md-9 col-lg-7 col-xl-6">
                                    <div className="card" >
                                        <div style={{textAlign:'left'}} className="card-body p-5">
                                            {/* <h3 className="text-uppercase text-start mb-2">Add Product</h3> */}

                                            <form >

                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example1cg">Select Product Name</label>
                                                    <select className="form-control form-control-md">
                                                        <option value="">Product 1</option>
                                                        <option value="">Product 2</option>
                                                        <option value="">Product 3</option>
                                                    </select>
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example3cg">Product Description</label>
                                                    <input type="text" id="form3Example3cg" className="form-control form-control-md" name="ProductDescription" />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-3">
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cg">Product Category</label>
                                                    <input type="text" id="form3Example4cg" className="form-control form-control-md" name="ProductCategory" />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cdg">Quantity</label>
                                                    <input type="number" id="form3Example4cdg" className="form-control form-control-md" name="ProductQuantity" />
                                                </div>

                                                <div data-mdb-input-init className="form-outline mb-4">
                                                    <label className="form-label fw-bold" htmlFor="form3Example4cdg">Choose Store</label>
                                                    <select className="form-control form-control-md">
                                                        <option value="">Delhi Office 1</option>
                                                        <option value="">Delhi Office 2</option>
                                                        <option value="">Delhi Office 3</option>
                                                    </select>
                                                </div>


                                                <div className="d-flex justify-content-center">
                                                    <button type="submit" data-mdb-button-init
                                                        data-mdb-ripple-init className="btn btn-primary">Place Order</button>
                                                </div>

                                            </form>

                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </div>




                </div>
            </div>

        </div>
    )
}

export default PlaceOrderPage