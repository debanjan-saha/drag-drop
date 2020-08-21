import { Component, VERSION } from "@angular/core";
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray
} from "@angular/cdk/drag-drop";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  connectedTo = ["section-drop-list", "form-area-drop-list"];
  elements = [
    {
      name: "Debanjan Saha",
      id: 28,
      type: "parent",
      children: [
        { name: "Bincy Pothen", id: 29 },
        { name: "Pankul Gupta", id: 30 }
      ]
    },
    { name: "Prajakta Aryamane", id: 31 },
    { name: "Govind Bisht", id: 32 },
    { name: "Rahul Vyas", id: 33 },
    { name: "Sachin Mane", id: 34 }
  ];

  onDropIntoSection(event: CdkDragDrop<any>, index: number) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(
        this.elements[0].children,
        event.previousIndex,
        event.currentIndex
      );
    } else if (event.previousContainer.id === "form-area-drop-list") {
      transferArrayItem(
        this.elements,
        this.elements[index].children,
        event.previousIndex,
        event.currentIndex
      );
    }
  }

  onDrop(event: CdkDragDrop<any>) {
    if (event.previousContainer.id === event.container.id) {
      moveItemInArray(this.elements, event.previousIndex, event.currentIndex);
    } else if (event.previousContainer.id === "section-drop-list") {
      const parentId = event.item.data.parentId;
      const index = this.elements.findIndex(el => el.id === parentId);
      if (index !== -1) {
        transferArrayItem(
        this.elements[index].children,
        this.elements,
        event.previousIndex,
        event.currentIndex
      );
      }
    }
  }

  delete(id: number) {
    for (let i = 0; i < this.elements.length; i++) {
      const el = this.elements[i];
      if (el.type === "parent") {
        const index = el.children.findIndex(child => child.id === id);
        if (index !== -1) {
          el.children.splice(index, 1);
          break;
        }
      } else {
        const index = this.elements.findIndex(ele => ele.id === id);
        if (index !== -1) {
          this.elements.splice(index, 1);
          break;
        }
      }
    }
  }
}
