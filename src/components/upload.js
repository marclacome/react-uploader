import React from 'react';
import * as UPLOAD_ACTIONS from '../actions/file_upload';
import {connect} from 'react-redux';
import {VALID_UPLOAD, VALID_UPLOAD_DISPLAY} from '../consts';
import DropTarget from './drag_drop_target';
import { DragDropContext } from 'react-dnd';
import HTML5Backend from 'react-dnd-html5-backend';

class AdminUpload extends React.Component
{
    constructor()
    {
        super();
        this.selectFile = this.selectFile.bind(this);
        this.doUpload = this.doUpload.bind(this);
        this.fileSelector=React.createRef();
        this.selectFiles=this.selectFiles.bind(this);
        this.onDrop = this.onDrop.bind(this);
        this.setSelected = this.setSelected.bind(this);
    }

    componentDidMount()
    {
        this.props.initUploadPage(this.props.filetype);
    }


    doUpload()
    {
		if(this.props.upload.upload_ar.length === 0 )
			return;
        this.props.doUpload(this.props.upload.upload_ar, this.props.upload.selected_directory, this.props.filetype);
    }

    selectFile(e)
    {
        let files = e.target.files || e.dataTransfer.files;
        if(!files.length)
            return;
        this.files = files;
        for(let i=0; i<files.length; i++)
        {        
            this.createUploadableFile(files[i]);
        }
    }

    createUploadableFile(file){
        let reader = new FileReader();
        reader.onload = (e)=>{
            this.props.addUploadable({fname: file.name, file_data: e.target.result, size:file.size, filetype:this.props.filetype});
        }
        reader.readAsDataURL(file);
    }

    selectFiles()
    {
        this.fileSelector.current.click();
    }

    onDrop(dropped){
         Array.isArray(dropped)?dropped.map((item)=>this.createUploadableFile(item)):this.createUploadableFile(dropped);
      }

    setSelected(e)
    {
        this.props.selectDirectory(e.target.value);
    }

    render() 
    {
        const hidden={display:'none'};
        return (            
        <React.Fragment>
            <div className="row">
                <div className="small-2 columns">
                    <div className='upload-status target'>{this.props.upload.upload_state}</div>
					<div>Upload To</div>
					{this.props.filetype==='image'?
                    <select value={this.props.upload.selected_directory} onChange={this.setSelected}>{this.props.upload.directories.map((item)=><option key={item} value={item}>{item}</option>)}</select>
                    :null}
                    <button className='button' onClick={this.doUpload} disabled={this.props.upload.upload_state===UPLOAD_ACTIONS.UPLOAD_COMPLETE}>Upload</button>
                    <button className='button' onClick={this.selectFiles}>select</button>
                    <DropTarget onDrop = {this.onDrop} />
                    <div style={hidden}><input ref={this.fileSelector} type='file' id='single' onChange={this.selectFile} multiple /></div>
                    <div className='drag_drop_panel'></div>
                </div>
                <div className="small-10 columns">
                    <div className='row gallery-container small-up-2 medium-up-4 large-up-4'>
                        {this.props.upload.upload_ar.map((item, index)=>{
							const comp = item.complete < 100 ? item.complete + '%' : 'FINISHED';
                            return(
                        <div key={index+item.fname} className='column column-block gallery'>
						<div className = ' uploadable-thumb-wrap'>
                            {
								(this.props.filetype==='image' & item.enabled === VALID_UPLOAD.Uploadable) ? 
	                                <img className='uploadable-thumb'  src={item.file_data} alt={'uplodable'+item.file_data}/>:<div className='bad_upload_name'>
                                    {item.fname}</div>
                            }
                        <p>{(item.complete !== UPLOAD_ACTIONS.UPLOAD_NONE) ? comp : VALID_UPLOAD_DISPLAY[item.enabled]}</p>
                        <p><button id={'remove_'+index} className='button' onClick={this.props.removeUploadable.bind(this, index)} disabled={this.props.upload.upload_state !== UPLOAD_ACTIONS.UPLOAD_NONE}>Delete</button></p>
					</div>
        </div>)})}
                </div>
            </div>
        </div>
    </React.Fragment>
    )
    }   
} 

const mapStateToProps = state => {
        return {
            upload: state.file_upload
        };
      };
      
    
const mapDispatchToProps = dispatch=>{
        return {
            doUpload: (ar, dir, filetype)=>dispatch(UPLOAD_ACTIONS.doUpload(ar, dir, filetype)),
            addUploadable: (img)=>dispatch(UPLOAD_ACTIONS.addToUpload(img)),
            removeUploadable: (index)=>dispatch(UPLOAD_ACTIONS.removeUploadable(index)),
            initUploadPage: (filetype)=>dispatch(UPLOAD_ACTIONS.InitUploadPage(filetype)),
            selectDirectory: (val)=>dispatch(UPLOAD_ACTIONS.SelectDirectory(val))
        }
      }
      
export default connect(mapStateToProps, mapDispatchToProps)( DragDropContext(HTML5Backend)(AdminUpload));
      

