import { Component, VERSION } from "@angular/core";
import {
  CdkDragDrop,
  transferArrayItem,
  moveItemInArray,
CdkDragEnter
} from "@angular/cdk/drag-drop";

@Component({
  selector: "my-app",
  templateUrl: "./app.component.html",
  styleUrls: ["./app.component.css"]
})
export class AppComponent {
  dropLists = [];
  connectedTo = ["section-drop-list", "form-area-drop-list"];
  elements = [
    {
      name: "Group 1",
      id: 28,
      type: "parent",
      children: [
        { name: "Child 1", id: 29 },
        { name: "Child 2", id: 30 },
        { name: "Child 3", id: 35 },
        { name: "Child 4", id: 36 }
      ]
    },
    { name: "Child 5", id: 31 },
    { name: "Child 6", id: 32 },
    { name: "Child 7", id: 33 },
    { name: "Child 8", id: 34 },
    {
      name: "Group 2",
      id: 27,
      type: "parent",
      children: [
        { name: "Child 9", id: 37 },
        { name: "Child 10", id: 38 }
      ]
    },
  ];

  onDropIntoSection(event: any, index: number) {
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

  onDragStarted(event: any) {
    // this.dropLists = ["form-area-drop-list"];
  }

  onDragStopped(event: any) {
    // this.dropLists = ["section-drop-list"];
  }

  getConnectedDropList() {
    const listIds = ['form-area-drop-list'];
    this.elements.forEach(el => {
      if (el.type === 'parent') {
        listIds.unshift('section-drop-list-' + el.id);
      }
    });
    return listIds;
  }


}
