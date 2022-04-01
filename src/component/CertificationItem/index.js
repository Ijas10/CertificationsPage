import './index.css'

const CertificationItem = props => {
  const {details} = props
  const {nameOfCertificate, nameOfIssuer, fileSelected, count} = details

  const objectUrl = URL.createObjectURL(fileSelected)
  return (
    <li className="listElement">
      <div className="numberContainer">{count}</div>
      <div className="compartmentOfList">
        <div className="flexBox">
          <p className="nameOfCertificate">{nameOfCertificate}</p>
          <p className="nameOfUniversity">{nameOfIssuer}</p>
        </div>
        <a className="link" href={objectUrl} target="blank">
          View certification
        </a>
      </div>
    </li>
  )
}
export default CertificationItem
