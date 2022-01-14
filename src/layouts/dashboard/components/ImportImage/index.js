import React, {Component} from 'react';
import Card from "@mui/material/Card";
import MDBox from "../../../../components/MDBox";
import Dropzone from 'react-dropzone-uploader';
import './textAnimation.css'

let Compress = require('compress.js');
const axios = require('axios');

class ImportImage extends Component {
    state = {
        importImage: null,
        result: null
    };


    onChangeStatus = async ({meta, file}, status) => {
        if (status === 'done') {
            console.log(file);
            this.setState({importImage: file})
        }
        let result;
        const axios = require('axios');
        //  axios.get(`http://ricecrop-env.eba-ybgt8mei.us-east-1.elasticbeanstalk.com/dashboard?filename=)
      await axios.get(`http://ricecrop-env.eba-ybgt8mei.us-east-1.elasticbeanstalk.com/dashboard?filename=` + file.name)
            .then( response=> {
                result = response.data.data
                this.setState({result:response.data.data})
            });

    };

    render() {

        return (
            <Card sx={{height: "100%"}}>
                <div align='center'>
                    <MDBox pt={4} px={4} style={{justifyContent: "center", paddingBottom: '40px'}}>
                        <h2>Import Your Image</h2>
                        <small style={{color: '#c6bcc4'}}>Use a clear photograph to get the right result</small>
                        <Dropzone
                            maxFiles={1}
                            // getUploadParams={this.getUploadParams}
                            onChangeStatus={this.onChangeStatus}
                            accept="image/*"
                        />

                        {this.state.result !=null ?
                            <div  align='left' style={{padding :'15px', border:'1px solid #c6bcc4', borderRadius:'10px'}}>
                                <p style={{marginBottom:'10px'}}> <strong> Disaster Name :</strong> {this.state.result.status} </p>
                                <p style={{marginBottom:'10px'}}> <strong> Desc : </strong>{this.state.result.desc} </p>
                                <p style={{marginBottom:'10px'}}> <strong>Solutions :</strong> {this.state.result.solution} </p>
                            </div>:null
                        }

                    </MDBox>
                </div>
            </Card>
        )
    }
}

export default ImportImage;