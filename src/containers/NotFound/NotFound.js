import React, {Fragment} from 'react';


import { connect } from 'react-redux'

import * as actions from '../../store/actions/index';



const NotFound = (props) => {   
    const {
        onCheckUserConcessionId
    } = props;
    const goBack = () => {
        onCheckUserConcessionId()
        .then((response) => {
            if(response.isLoggedIn) {
                const concessionId = response.concessionId;
                if(concessionId){
                    props.history.push("/dashboard/" + concessionId);   
                }
                else{
                    props.history.push("/dashboard");
                }
            }else{
                props.history.push("/");
            }
        });
    }
    
    return (

        <Fragment>
            <p className="zoom-area"> We're sorry, the page you were looking for is either not found or you do not have the rights to access it.</p>

            <section className="error-container">
                <span className="four"><span className="screen-reader-text">4</span></span>
                <span className="zero"><span className="screen-reader-text">0</span></span>
                <span className="four"><span className="screen-reader-text">4</span></span>
            </section>
            <div className="link-container">
                {/* <a target="blank" href={props.history.location.pathname} class="more-link">Go Back</a> */}
                <a target="blank" onClick={goBack} className="more-link" style={{cursor: "pointer"}}>Go Back</a>
            </div>  
        </Fragment>
)};

const mapStateToProps = state => {
    return {
        
    }
}

const mapDispatchToProps = dispatch => {
    return {
        onCheckUserConcessionId: (params) => dispatch(actions.checkUserConcessionId(params)),
    }
}

export default connect(mapStateToProps, mapDispatchToProps)(NotFound);
