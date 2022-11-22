import React from 'react'
import { Route, Routes } from 'react-router-dom';

import Faq from './Faq';
import Suggestion from './Suggestion';
import Complaint from './Complaint';
import PrivacyPolicy from './PrivacyPolicy';
import TermsOfUse from './TermsOfUse';
import NotFound from '../Match/NotFound';

export default function FooterMain() {
    return (
        <Routes>
            <Route exact path='/faq' element={<Faq />} />
            <Route exact path='/suggestion' element={<Suggestion />} />
            <Route exact path='/complaint' element={<Complaint />} />
            <Route exact path='/privacy policy' element={<PrivacyPolicy />} />
            <Route exact path='/terms of use' element={<TermsOfUse />} />
            <Route path='/*' element={<NotFound />} />
        </Routes>
    )
}