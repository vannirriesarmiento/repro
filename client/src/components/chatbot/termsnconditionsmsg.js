
import React from 'react';
import '../App.css';

const termsnconditionsmsg = () => {
    return (
        <>
            <p className='justify'>
                By checking the box below, you bound to agree on these following terms and conditions:
            </p>
            <ol className="list">
                <li>Gathering of data for evaluation and analysis;
                    <ol>
                        <li>Personal Information; such as name, age, civil status, address, contact details, etc.  </li>
                        <li>Health-related Information; <i className="tip-center tip-top"
                            data-tip="Sexually Transmitted Infections or Diseases">STI/STDs</i> signs &amp; symptoms.</li>
                    </ol>
                </li>
                <li>Recommendation of laboratory procedures.</li>
            </ol>
            <h5>About the Study</h5>
            <h6><b>REPRO: A Chatbot for Young Adults’ Access to Reproductive and Sexual Health </b></h6>
            <p className='justify'>
                Repro bridges the gap between youths and their <i className="tip-center tip-top" data-tip="Sexual and Reproductive Health">SRH</i>&nbsp;
                through on-line chat conversation. An innovation meant to face patients before undergoing through onsite treatment and provide
                the rudimentary services that healthcare workers offer. Specifically, this study aims to develop a chatbot application that will:
            </p>
            <ol className="list">
                <li>Provide two way communication between user and chatbot.</li>
                <li>Answer to frequently asked questions regarding <i className="tip-center tip-top" data-tip="Sexual and Reproductive Health">SRH</i>.</li>
                <li>Suggest laboratory tests based on gathered symptoms.</li>
                <li>Profile user’s demographic information</li>
            </ol>
            <h5>Terms &amp; Conditions</h5>
            <h6>Risks</h6>
            <p className='justify'>
                Due to the heavy reliance on online presence, the study's main threats are unlawfully access of data. Though, the proponents
                utilized and vetted technology that can guarantee utmost privacy &amp; security.
            </p>
            <h6>Data Privacy</h6>
            <p className='justify'>
                To ensure the non violation of data privacy and protect user rights or welfare, the researchers adheres to the Data Privacy
                Act &#40;RA 10173&#41;. Therefore, all information gathered is kept in strict confidentiality, if deemed necessary, and will
                only be used for research purposes.
            </p>
            <h6>Voluntary Participation</h6>
            <p className='justify'>
                All the participation that occurred and will occur for the study will be voluntary and can only proceed if the participants
                agreed to partake in. The participant will also have the right to withdraw at any given time without any need to explain their
                withdrawal.
            </p>
            <h6>Social Value and Benefits</h6>
            <p className='justify'>
                The study is beneficial for both reproductive health centers and patients. For patients, the provision of service and assistance,
                is extended online. Answering patient’s questions and queries relating to <i className="tip-center tip-top" data-tip="Sexual and Reproductive 
                                    Health">SRH</i> can be done with Repro. Whereas for the health industry, Repro can help reduce man labor and man hours, expand patient reach,
                improve patient adherence, increase income, and keep up with the current trends.
            </p>
            <h5>User Guidelines</h5>
            <p className='justify'>
                Here are guides to maximize use of the system's features &amp; functionalities;
            </p>
            <ol className="list">
                <li>The only supported language available as of the moment is English (US-en).</li>
                <li>Only the predominant and syndromic <i className="tip-center tip-top" data-tip="Reproductive Tract Infections are defined 
                                    as any infections of the reproductive system. There are 3 types; STIs, Endogenous &amp; Exogenous Infections.">RTIs</i> and its symptoms
                    are covered. <i className="tip-center tip-top" data-tip="Sexually Transmitted Tnfections">STIs</i> of only gonorrhea, trichomoniasis, syphilis,&nbsp;
                    <i className="tip-center tip-top" data-tip="Non-Gonococcal Infection ">NGI</i>, genital herpes and warts, excluding <i className="tip-center tip-top"
                        data-tip="Human Immunodeficiency Virus or Acquired Immunodeficiency Syndrome">HIV/AIDS</i>. <i className="tip-center tip-top" data-tip="An infection 
                                    caused by an infectious agent that is already present in the body, but has previously been inapparent or dormant.">Endogenous infections</i> of&nbsp;
                    <i className="tip-center tip-top" data-tip="Bacterial Vaginosis">BV</i> and candidiasis at most.</li>
                {/* STIs precisely of gonorrhea, trichomoniasis, syphilis, NGI, genital herpes 
                                        and warts, excluding HIV/AIDS. And endogenous infections of BV and candidiasis only. */}
                {/* <li>1 entry per hour per device only, since Repro is using the user's <i className="tip-center tip-top" data-tip="Universally Unique Identifier">UUID</i> to keep logs of user information.
                    This is to emphasize on providing a safe venue for patients to confer their SRH concerns and attain treatment adherence. </li> */}
                {/* <li>If user is dormant, Repro will terminate conversation with a goodbye message after exceeding 20 minutes.</li> */}
                <li>If user is dormant, Repro will misinterpret the conversation after exceeding 20 minutes. So, try your best to remain active.</li>
                <li>Limited to one (1) tab per device only. Repro uses user's cookies as session ID, hence user cannot take part in another conversation unless previous session has expired.</li>
                <li>After session, a transcript is available for download. It is currently unavailable for IOS mobile users.</li>
                <li>Use actual and precise information for best results.</li>
                <li>Enjoy and have fun!</li>
            </ol>
        </>
    );
}

export default termsnconditionsmsg;

