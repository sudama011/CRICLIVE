import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBCol, MDBIcon } from 'mdb-react-ui-kit';

export default function Footer() {
    return (
        <MDBFooter bgColor='dark' className='text-center text-lg-start text-muted'>

            <section className=''>
                <MDBContainer className='text-center text-md-start pt-2'>
                    <MDBRow className='mt-3'>
                        <MDBCol md="3" lg="4" xl="3" className='mx-auto mb-2'>
                            <h6 className='text-uppercase fw-bold mb-4'>
                                <MDBIcon icon="gem" className="me-3" />
                                criclive
                            </h6>
                            <p>
                                <MDBIcon icon="home" className="me-2" />
                                MNIT, JAIPUR 302017, RAJ INDIA
                            </p>
                            <p>
                                <MDBIcon icon="envelope" className="me-3" />
                                criclive@gmail.com
                            </p>
                            <p>
                                <MDBIcon icon="phone" className="me-3" /> +91 9999999999
                            </p>
                            <p>
                                <MDBIcon icon="print" className="me-3" /> +91 8888888888
                            </p>

                        </MDBCol>

                        <MDBCol md="2" lg="2" xl="2" className='mx-auto mb-2'>
                            <h6 className='text-uppercase fw-bold mb-4'>Follow Us On</h6>
                            <p>
                                <a href='https://www.facebook.com/sudama.dhakad.31' title='Facebook' target="_blank" rel="noopener noreferrer" className='me-4 text-reset'>
                                    <MDBIcon fab icon='facebook-f' /> facebook
                                </a>
                            </p>
                            <p>
                                <a href='https://twitter.com/sdhakad011' target="_blank" rel="noopener noreferrer"  className='me-4 text-reset'>
                                    <MDBIcon fab icon="twitter" /> twitter
                                </a>
                            </p><p>
                                <a href='https://www.instagram.com/sudama.dhakad/' target="_blank" rel="noopener noreferrer" className='me-4 text-reset'>
                                    <MDBIcon fab icon="instagram" /> instagram
                                </a>
                            </p>
                            <p>
                                <a href='https://www.linkedin.com/in/sudama-dhakad-71a0a8201/' target="_blank" rel="noopener noreferrer" className='me-4 text-reset'>
                                    <MDBIcon fab icon="linkedin" /> linkedin
                                </a>
                            </p>

                        </MDBCol>

                        <MDBCol md="3" lg="2" xl="2" className='mx-auto mb-2'>
                            <h6 className='text-uppercase fw-bold mb-4'>COMPANY</h6>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Careers
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Advertise
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Privacy Policy
                                </a>
                            </p>
                            <p>
                                <a href='#!' className='text-reset'>
                                    Terms of Use
                                </a>
                            </p>
                        </MDBCol>


                    </MDBRow>
                </MDBContainer>
            </section>

            <div className='text-center p-2' style={{ backgroundColor: 'rgba(0, 0, 0, 0.05)' }}>
                © 2022 criclive, All rights reserved
            </div>
        </MDBFooter>
    );
}