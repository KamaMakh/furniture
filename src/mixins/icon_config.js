export default {
  name: "icon_config",
  props: {
    width: {
      type: [Number, String]
    },
    height: {
      type: [Number, String]
    },
    fill: {
      type: String
    },
    active: {
      type: Boolean,
      default: false
    },
    activeColor: {
      type: String,
      default: "#8BD118"
    },
    stroke: {
      type: String
    },
    opacity: {
      type: [String, Number]
    }
  }
};
