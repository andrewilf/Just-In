import React from 'react';
import { MDBFooter, MDBContainer, MDBRow, MDBBtn} from 'mdb-react-ui-kit';

export default function App() {
  return (
    <MDBFooter  className='text-center text-lg-left' >
      <MDBContainer className='p-4'>
        <MDBRow>
        
            <h5 className='text-uppercase'>End of feed</h5>

            <p>
              Add more people to the current profile or come back tomorrow for new content.
            </p>
        

        </MDBRow>
      </MDBContainer>
      
      <div className='text-center p-3' style={{ backgroundColor: 'rgba(0, 0, 0, 0.2)', margin:0}}>
        &copy; {new Date().getFullYear()} Copyright:{' '}
        <a className='text-dark' href='https://mdbootstrap.com/'>
          MDBootstrap.com
        </a>
      </div>
      <MDBBtn className="btn btn-danger" style={{margin: "15px"}} onClick={()=>{
        localStorage.clear()

      }
        }>Restart all profiles data</MDBBtn>
    </MDBFooter>
  );
}