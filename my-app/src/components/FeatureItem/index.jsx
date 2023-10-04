import '../../styles/index.css'

function FeatureItem(props) {

    const {src, h3, p} = props

    return (
        <div className="feature-item">
            <img
              src={src}
              alt="Icon"
              className="feature-icon"
            />
            <h3 className="feature-item-title">{h3}</h3>
            <p>
              {p}
            </p>
        </div>
    );
}

export default FeatureItem;

