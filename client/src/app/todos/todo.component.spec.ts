import {ComponentFixture, TestBed, async} from '@angular/core/testing';

import {Todo} from "./todo";

import {TodoComponent} from './todo.component';
import{TodoListService} from "./todo-list.service";
import {Observable} from "rxjs";

describe('TodoComponent', () => {
    let component: TodoComponent;
    let fixture: ComponentFixture<TodoComponent>;

    let todoListServiceStub: {
        getTodoById: (todoId: string) => Observable<Todo>
    };

    beforeEach(() => {

        todoListServiceStub = {
            getTodoById: (todoId: string) => Observable.of([
            {
                id: "58895985a22c04e761776d54",
                owner: "Blanche",
                status: false,
                body: "In sunt ex non tempor cillum commodo amet incididunt anim qui commodo quis. Cillum non labore ex sint esse.",
                category: "software design"
            },
            {
                id: "58895985c1849992336c219b",
                owner: "Fry",
                status: false,
                body: "Ipsum esse est ullamco magna tempor anim laborum non officia deserunt veniam commodo. Aute minim incididunt ex commodo.",
                category: "video games"
            },
            {
                id: "58895985ae3b752b124e7663",
                owner: "Fry",
                status: true,
                body: "Ullamco irure laborum magna dolor non. Anim occaecat adipisicing cillum eu magna in.",
                category: "homework"
            }
        ].find(todo => todo.id === todoId))
    };


        TestBed.configureTestingModule({
            declarations: [TodoComponent],
            providers: [{provide: TodoListService, useValue: todoListServiceStub}]
        });
    });

    beforeEach(async(() => {
        TestBed.compileComponents().then(() => {
            fixture = TestBed.createComponent(TodoComponent);
            component = fixture.componentInstance;
        });
    }));

    it('should be created', () => {
        expect(component).toBeTruthy();
    });

    it("can retrieve 58895985a22c04e761776d54 by ID", () => {
        component.setId("58895985a22c04e761776d54");
        expect(component.todo).toBeDefined();
        expect(component.todo.owner).toBe("Blanche");
        expect(component.todo.status).toBe(false);
    });

    it("returns undefined for non-existant ID", () => {
        component.setId("182755281759ae91827196");
        expect(component.todo).not.toBeDefined();
    });

});
