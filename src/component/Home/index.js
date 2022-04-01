import {Component} from 'react'
import {GrClose} from 'react-icons/gr'
import {AiOutlineUpload} from 'react-icons/ai'
import {v4 as uuidv4} from 'uuid'
import CertificationItem from '../CertificationItem'
import './index.css'

class Home extends Component {
  state = {
    listOfCertifications: [],
    count: 1,
    nameOfCertificate: '',
    nameOfIssuer: '',
    fileSelected: '',
    showPara: false,
    showErrorMsg1: false,
    showErrorMsg2: false,
  }

  blurEvent1 = event => {
    if (event.target.value === '') {
      this.setState({showErrorMsg1: true})
    } else {
      this.setState({showErrorMsg1: false})
    }
  }

  blurEvent2 = event => {
    if (event.target.value === '') {
      this.setState({showErrorMsg2: true})
    } else {
      this.setState({showErrorMsg2: false})
    }
  }

  changeCertificateName = event => {
    this.setState({nameOfCertificate: event.target.value})
  }

  changeIssuerName = event => {
    this.setState({nameOfIssuer: event.target.value})
  }

  uploadingFile = event => {
    if (event.target.files && event.target.files[0]) {
      this.setState({
        fileSelected: event.target.files[0],
      })
    }
  }

  submitDetails = event => {
    event.preventDefault()
    const {nameOfCertificate, nameOfIssuer, fileSelected, count} = this.state

    if (nameOfCertificate === '') {
      this.setState({showErrorMsg1: true})
    } else if (nameOfIssuer === '') {
      this.setState({showErrorMsg2: true})
    } else if (
      fileSelected !== '' &&
      nameOfIssuer !== '' &&
      nameOfCertificate !== ''
    ) {
      const newCertificationData = {
        id: uuidv4(),
        count,
        nameOfCertificate,
        nameOfIssuer,
        fileSelected,
      }
      if (count < 6) {
        this.setState(prevState => ({
          listOfCertifications: [
            ...prevState.listOfCertifications,
            newCertificationData,
          ],
          nameOfCertificate: '',
          nameOfIssuer: '',
          fileSelected: '',
          count: prevState.count + 1,
        }))
      } else {
        this.setState({showPara: true})
      }
    }
  }

  render() {
    const {
      showErrorMsg1,
      showErrorMsg2,

      nameOfCertificate,
      nameOfIssuer,
      listOfCertifications,
      fileSelected,
      showPara,
    } = this.state
    console.log(fileSelected)
    return (
      <>
        <div className="mainPage">
          <h1 className="header">Skills-Based Certifications</h1>
          <p className="shortNote">(You can add upto 5 certifications)</p>
          <form className="form" onSubmit={this.submitDetails}>
            <GrClose className="closeButtonIcon" />
            <div className="flexCompartment">
              <div className="divCompartment">
                <label htmlFor="inputEle1">Certification Name</label>
                <input
                  type="text"
                  className="inputEle"
                  id="inputEle1"
                  placeholder="Enter certificate name"
                  onBlur={this.blurEvent1}
                  onChange={this.changeCertificateName}
                  value={nameOfCertificate}
                />
                {showErrorMsg1 && (
                  <p className="errorMsg">Please enter certification name</p>
                )}
              </div>
              <div className="divCompartment">
                <label htmlFor="inputEle2">Issuer</label>
                <input
                  type="text"
                  className="inputEle"
                  id="inputEle2"
                  placeholder="Enter issuer"
                  onBlur={this.blurEvent2}
                  onChange={this.changeIssuerName}
                  value={nameOfIssuer}
                />
                {showErrorMsg2 && (
                  <p className="errorMsg">Please enter issuer name</p>
                )}
              </div>
            </div>
            <div className="divCompartmentOfUpload">
              <label
                htmlFor="uploadId"
                onChange={this.uploadingFile}
                className="labelEl"
                onBlur={this.blurEvent3}
              >
                <p className="greyFont">
                  {fileSelected === ''
                    ? 'Upload a file showing your certification'
                    : `${fileSelected.name}`}
                </p>
                <input
                  id="uploadId"
                  type="file"
                  className="inputEle2"
                  accept="image/jpeg,application/pdf"
                  placeholder="Upload a file showing your certification"
                  name=""
                  hidden
                />
                <div className="uploadButton">
                  <p className="uploadText">UPLOAD</p>
                  <AiOutlineUpload className="uploadIcon" />
                </div>
              </label>
            </div>

            <p className="instructionText">
              (File format should only be pdf and jpg)
            </p>
            <button className="submitButton" type="submit">
              SAVE CERTIFICATION
            </button>
          </form>
        </div>
        <hr className="horizontal" />
        <div className="certificationsCompartment">
          {showPara && (
            <p className="error">*You can only add 5 certifications</p>
          )}
          <ul className="certificationsList">
            {listOfCertifications.map(each => (
              <CertificationItem details={each} key={each.id} />
            ))}
          </ul>
        </div>
      </>
    )
  }
}

export default Home
