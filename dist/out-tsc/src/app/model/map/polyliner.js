export class Polyline {
    constructor(path, color, icon) {
        this.color = color;
        this.path = path;
        this.icon = icon;
    }
    addLocation(location) {
        this.path.push(location);
    }
}
//# sourceMappingURL=polyliner.js.map