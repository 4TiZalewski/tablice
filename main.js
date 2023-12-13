// @ts-check

/**
 * @type {HTMLButtonElement | null}
 */
const submit_btn_next_nullable = document.querySelector("#submit-next");

/**
 * @type {HTMLButtonElement | null}
 */
const submit_btn_prev_nullable = document.querySelector("#submit-prev");

/**
 * @type {HTMLInputElement | null}
 */
const array_element_nullable = document.querySelector("#array-element");

/**
 * @type {HTMLDivElement | null}
 */
const display_nullable = document.querySelector("#display");

/**
 * @type {Array<string>}
 */
const array = [];

if (submit_btn_next_nullable && submit_btn_prev_nullable  && array_element_nullable && display_nullable) {
    const submit_btn_next = /** @type {HTMLButtonElement} */ (submit_btn_next_nullable);
    const submit_btn_prev = /** @type {HTMLButtonElement} */ (submit_btn_prev_nullable);
    const array_element = /** @type {HTMLInputElement} */ (array_element_nullable);
    const display = /** @type {HTMLDivElement} */ (display_nullable);

    submit_btn_next.addEventListener("click", (event) => {
        event.preventDefault();

        const value = array_element.value.trim();
        array_element.value = "";

        append_to_array_at_end(value, display);
    });

    submit_btn_prev.addEventListener("click", (event) => {
        event.preventDefault();

        const value = array_element.value.trim();
        array_element.value = "";

        append_to_array_at_start(value, display);
    });
} else {
    console.warn("Required elements do not exist!");
}

/**
 * @param {HTMLElement} element 
 */
function clear_children(element) {
    while (element.firstChild) {
        element.removeChild(element.firstChild);
    }
}

/**
 * @param {string} value 
 * @param {HTMLElement} display 
 */
function append_to_array_at_end(value, display) {
    append_to_array(value, display, "koniec", (array, value) => {
        array.push(value);
    });
}

/**
 * @param {string} value 
 * @param {HTMLElement} display 
 */
function append_to_array_at_start(value, display) {
    append_to_array(value, display, "początek", (array, value) => {
        array.unshift(value);
    });
}

/**
 * 
 * @param {string} value 
 * @param {(array: Array<string>, value: string) => void} method
 * @param {HTMLElement} value 
 * @param {string} what_did_you_do
 */
function append_to_array(value, display, what_did_you_do, method) {
    const msg = document.createElement("p");
    clear_children(display);

    if (value != "") {
        msg.innerText = `Wprowadziłeś ${value} na ${what_did_you_do} tablicy`;
        method(array, value);
    } else {
        msg.innerText = "Wprowadź poprawnie element";
    }

    display.append(msg);
    display.append(document.createElement("br"));

    for (let i = 0; i < array.length; i++) {
        const element = document.createElement("p");
        element.innerText = `${i + 1}. Element ${i} tablicy to ${array[i]}`;
        display.append(element);
    }
}