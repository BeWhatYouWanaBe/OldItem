function Prop (propData, num) {
    this.id = propData.id || null;
    this.name = propData.name || null;
    this.price = propData.price || null;
    this.description = propData.description || null;
    this.url = propData.url || null;
    this.num = num || null;
}

module.exports = Prop;