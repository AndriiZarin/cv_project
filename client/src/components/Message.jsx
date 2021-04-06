import PropTypes from "prop-types";

const Message = ({ type, color, children }) => {
  return (
    <div role="alert" className={`ui icon message ${color}`}>
      <i className={`icon ${type}`}></i>
      <div className="content">
        <div className="header">{children}</div>
      </div>
    </div>
  );
};

Message.defaultProps = {
  type: "info",
  color: "olive",
};

Message.propTypes = {
  type: PropTypes.string.isRequired,
  color: PropTypes.string.isRequired,
  children: PropTypes.oneOfType([
    PropTypes.node,
    PropTypes.arrayOf(PropTypes.node),
  ]),
};

export default Message;
