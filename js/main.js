$(window).on("load", function () {
    (setTimeout(function () {
        $(".preloader").addClass("loaded")
    }, 1e3), $(".portfolio-items").length) && ($(".portfolio-items").isotope(), $(".portfolio-filter ul li").on("click", function () {
        $(".portfolio-filter ul li").removeClass("sel-item"), $(this).addClass("sel-item");
        var t = $(this).attr("data-filter");
        $(".portfolio-items").isotope({
            filter: t,
            animationOptions: {
                duration: 750,
                easing: "linear",
                queue: !1
            }
        })
    }))
}), $(function () {
    "use strict";
    var t = $(window);

    function o() {
        $("#home").css({
            height: $(window).height() + "px"
        })
    }
    o(), t.resize(o), $.scrollIt({
            upKey: 38,
            downKey: 40,
            easing: "swing",
            scrollTime: 600,
            activeClass: "active",
            onPageChange: null,
            topOffset: -15
        }), t.on("scroll", function () {
            var o = t.scrollTop(),
                a = $(".navbar");
            o > 300 ? a.addClass("fixed-top") : a.removeClass("fixed-top")
        }),
        function () {
            if ($("section.stats").length > 0) {
                var t = 0;
                $(window).on("scroll", function () {
                    var o = $("section.stats").offset().top - window.innerHeight;
                    0 == t && $(window).scrollTop() > o && ($("section.stats .single-stat .counter").each(function () {
                        var t = $(this),
                            o = t.attr("data-count");
                        $({
                            countNum: t.text()
                        }).animate({
                            countNum: o
                        }, {
                            duration: 2e3,
                            easing: "swing",
                            step: function () {
                                t.text(Math.floor(this.countNum))
                            },
                            complete: function () {
                                t.text(this.countNum)
                            }
                        })
                    }), t = 1)
                })
            }
        }(), $(".nav-item .nav-link").on("click", function () {
            $(".navbar-collapse").removeClass("show")
        }), t.stellar({
            horizontalScrolling: !1
        }), $(".portfolio .link").magnificPopup({
            delegate: "a",
            type: "image",
            gallery: {
                enabled: !0
            }
        }), $(".blogs .owl-carousel").owlCarousel({
            loop: !0,
            margin: 30,
            autoplay: !0,
            smartSpeed: 500,
            responsiveClass: !0,
            dots: !1,
            responsive: {
                0: {
                    items: 1
                },
                700: {
                    items: 2
                },
                1e3: {
                    items: 3
                }
            }
        }), $(".testimonials .owl-carousel").owlCarousel({
            items: 1,
            loop: !0,
            autoplay: !0,
            smartSpeed: 500
        })

});


// Selectors

const todoInput = document.querySelector(".todo-input");
const todoButton = document.querySelector(".todo-button");
const todoList = document.querySelector(".todo-list");
const filter = document.querySelector(".filter-todo");

// Event Listeners

document.addEventListener("DOMContentLoaded", getTodos);
todoButton.addEventListener("click", addTodo);
todoList.addEventListener("click", deleteCheck);
filter.addEventListener("change", filterTodo);

// Functions

function createComponents(value) {
    // Create div
    const todoDiv = document.createElement("div");
    todoDiv.classList.add("todo");

    // Create li
    const newTodo = document.createElement("li");
    newTodo.innerText = value;
    newTodo.classList.add("todo-item");
    todoDiv.appendChild(newTodo);

    // Create Completed button
    const completedButton = document.createElement("button");
    completedButton.innerHTML = "<i class='fas fa-check'></i>";
    completedButton.classList.add("check-btn");
    todoDiv.appendChild(completedButton);

    // Create Trash button
    const trashButton = document.createElement("button");
    trashButton.innerHTML = "<i class='fas fa-trash'></i>";
    trashButton.classList.add("trash-btn");
    todoDiv.appendChild(trashButton);

    // Append all
    todoList.appendChild(todoDiv);
}

function addTodo(e) {
    // Validate and prevent refresh
    e.preventDefault();
    if (!todoInput.value) return;

    // Creating all components
    createComponents(todoInput.value);

    // Add todo to local storage
    saveLocalTodos(todoInput.value);

    // Clear and focus Input
    todoInput.value = "";
}

function deleteCheck(e) {
    const item = e.target;
    const todo = item.parentElement;

    // delete todo
    if (item.classList[0] === "trash-btn") {
        todo.classList.add("fall");
        todo.addEventListener("animationend", function () {
            removeLocalTodos(todo);
            todo.remove();
        });
    }

    // completed todo
    if (item.classList[0] === "check-btn") todo.classList.toggle("completed");
}

function filterTodo(e) {
    const value = e.target.value;
    const todos = todoList.childNodes;
    console.log(value);
    todos.forEach(function (todo) {
        switch (value) {
            case "all":
                todo.style.display = "flex";
                break;
            case "completed":
                if (todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }

                break;
            case "uncompleted":
                if (!todo.classList.contains("completed")) {
                    todo.style.display = "flex";
                } else {
                    todo.style.display = "none";
                }
                break;
            default:
                return;
        }
    });
}
