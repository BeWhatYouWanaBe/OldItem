function Plot (plotData) {
    this.msgId = plotData.msgId || null;
    this.senderId = plotData.senderId || null;
    this.style = plotData.style || null;
    this.type = plotData.type || null;
    this.content = plotData.content || null;
    this.events = plotData.events || null;
    this.showPosition = plotData.showPosition || null;
    this.plotPerson = plotData.plotPerson || null;
}
module.exports = Plot;


