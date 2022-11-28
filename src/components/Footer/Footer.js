import React from 'react';
import { Link } from 'react-router-dom'
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-white-50'>

            <MDBContainer className='text-center text-md-start pt-2'>
                <MDBRow className='mt-1'>
                    <MDBCol md="3" lg="4" xl="4" className='mx-auto mb-0' color='#bfbfbf'>
                        <div className='h6 text-uppercase fw-bold mb-4'>
                            criclive
                        </div>
                        <p>
                            <MDBIcon fas icon="home" />
                            MNIT, JAIPUR 302017
                        </p>
                        <p>
                            RAJASTHAN INDIA
                        </p>
                        <p>
                            <MDBIcon fas icon="envelope" />
                            criclive@gmail.com
                        </p>
                        <p>
                            <MDBIcon fas icon="phone" />
                            +91 9999999999
                        </p>

                    </MDBCol>

                    <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-0'>
                        <div className='h6 text-uppercase fw-bold mb-4'>COMPANY</div>

                        <Link className='active nav-link me-4 text-white' to='/footer/faq' title='Frequently Asked Questions'>FAQ</Link>
                        <Link className='active nav-link me-4 text-white' to='/footer/suggestion'>Suggestion</Link>
                        <Link className='active nav-link me-4 text-white' to='/footer/complaint'>Complaint</Link>
                        <Link className='active nav-link me-4 text-white' to='/footer/privacy policy'>Privacy Policy</Link>
                        <Link className='active nav-link me-4 text-white' to='/footer/terms of use'>Terms of Use</Link>

                    </MDBCol>


                </MDBRow>
            </MDBContainer>
            <div className='text-center my-1'>
                Follow Us On
                <a href='https://www.facebook.com/sudama.dhakad.31'
                    target="_blank" rel="noopener noreferrer">
                    <MDBIcon icon="facebook" className="mx-2" />
                </a>

                <a href='https://twitter.com/sdhakad011'
                    target="_blank" rel="noopener noreferrer">
                    <MDBIcon icon="twitter" className="mx-2" />
                </a>

                <a href='https://www.instagram.com/sudama.dhakad/'
                    target="_blank" rel="noopener noreferrer">
                    <MDBIcon icon="instagram" className="mx-2" />
                </a>

                <a href='https://www.linkedin.com/in/sudama-dhakad-71a0a8201/'
                    target="_blank" rel="noopener noreferrer">
                    <MDBIcon icon="linkedin" className="mx-2" />
                </a>
            </div>
            <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2022 criclive, All rights reserved
            </div>
        </MDBFooter>
    );
}