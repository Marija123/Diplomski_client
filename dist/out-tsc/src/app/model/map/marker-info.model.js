export class MarkerInfo {
    constructor(location, icon, title, label, link) {
        this.iconUrl = icon;
        this.title = title;
        this.label = label;
        this.location = location;
        this.link = link;
    }
    updatePosition(loc) {
        this.location = loc;
    }
}
//# sourceMappingURL=marker-info.model.js.map