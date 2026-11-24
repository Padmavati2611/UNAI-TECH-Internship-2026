
// ==========================================
// AI RECOMMENDATION ENGINE
// Frontend JavaScript
// ==========================================

// Backend API URL
const API_BASE_URL = "http://127.0.0.1:5000";

// Store all catalog items
let allItems = [];

// ==========================================
// 1. LOAD ITEMS FROM PYTHON BACKEND
// ==========================================

async function loadItems() {

    const itemContainer = document.getElementById("item-container");

    if (!itemContainer) {
        console.error("Item container not found!");
        return;
    }

    itemContainer.innerHTML = "<p>Loading items...</p>";

    try {

        const response = await fetch(`${API_BASE_URL}/api/items`);

        if (!response.ok) {
            throw new Error("Failed to load items: " + response.status);
        }

        const data = await response.json();

        allItems = Array.isArray(data)
            ? data
            : (data.items || data.data || []);

        displayItems(allItems);

    } catch (error) {

        console.error("Loading Error:", error);

        itemContainer.innerHTML =
            "<p>Unable to load courses. Please check your backend.</p>";
    }
}

// ==========================================
// 2. DISPLAY COURSE CARDS
// ==========================================

function displayItems(items) {

    const itemContainer = document.getElementById("item-container");

    itemContainer.innerHTML = "";

    if (!items || items.length === 0) {

        itemContainer.innerHTML =
            "<p>No courses or articles available.</p>";

        return;
    }

    items.forEach((item, index) => {

        const card = document.createElement("div");
        card.className = "item-card";

        const title = item.title || item.name || "Untitled Item";

        const description =
            item.description || item.summary || "Explore this learning resource.";

        const category =
            item.category || item.type || "Learning Resource";

        const itemId = item.id ?? item.item_id ?? index;

        const titleElement = document.createElement("h3");
        titleElement.textContent = title;

        const descriptionElement = document.createElement("p");
        descriptionElement.textContent = description;

        const categoryElement = document.createElement("p");
        categoryElement.textContent = "Category: " + category;

        const viewButton = document.createElement("button");
        viewButton.textContent = "View Item";
        viewButton.className = "view-button";

        viewButton.addEventListener("click", () => {
            viewItem(itemId);
        });

        card.appendChild(titleElement);
        card.appendChild(descriptionElement);
        card.appendChild(categoryElement);
        card.appendChild(viewButton);

        itemContainer.appendChild(card);
    });
}

// ==========================================
// 3. SEARCH COURSES AND ARTICLES
// ==========================================

function searchItems() {

    const searchInput = document.getElementById("search-input");

    if (!searchInput) return;

    const searchText = searchInput.value.toLowerCase().trim();

    const filteredItems = allItems.filter(item => {

        const title = (item.title || item.name || "").toLowerCase();

        const description =
            (item.description || item.summary || "").toLowerCase();

        const category =
            (item.category || item.type || "").toLowerCase();

        return (
            title.includes(searchText) ||
            description.includes(searchText) ||
            category.includes(searchText)
        );
    });

    displayItems(filteredItems);
}

// ==========================================
// 4. VIEW COURSE DETAILS
// ==========================================

async function viewItem(id) {

    const selectedItem = allItems.find(item =>
        String(item.id ?? item.item_id) === String(id)
    );

    if (!selectedItem) {
        alert("Course not found!");
        return;
    }

    // Create popup
    const modal = document.createElement("div");
    modal.className = "course-modal";

    const content = document.createElement("div");
    content.className = "course-modal-content";

    // Course title
    const title = document.createElement("h2");
    title.textContent = selectedItem.name || selectedItem.title;

    // Course description
    const description = document.createElement("p");
    description.textContent =
        selectedItem.description || "No description available.";

    // Course category
    const category = document.createElement("p");
    category.textContent =
        "Category: " + (selectedItem.category || "Learning Resource");

    // Status message
    const status = document.createElement("p");
    status.textContent = "Recording your activity...";

    // Close button
    const closeButton = document.createElement("button");
    closeButton.textContent = "Close";
    closeButton.className = "close-button";

    closeButton.addEventListener("click", () => {
        modal.remove();
    });

    // Add elements to popup
    content.appendChild(title);
    content.appendChild(description);
    content.appendChild(category);
    content.appendChild(status);
    content.appendChild(closeButton);

    modal.appendChild(content);

    document.body.appendChild(modal);

    // Close popup when clicking outside
    modal.addEventListener("click", event => {
        if (event.target === modal) {
            modal.remove();
        }
    });

    // Record interaction in backend
    try {

        const response = await fetch(
            `${API_BASE_URL}/api/interactions`,
            {
                method: "POST",
                headers: {
                    "Content-Type": "application/json"
                },
                body: JSON.stringify({
                    item_id: selectedItem.id ?? selectedItem.item_id,
                    action: "view"
                })
            }
        );

        const result = await response.json();

        if (!response.ok) {
            throw new Error(result.message || "Interaction failed");
        }

        status.textContent = "Your activity has been recorded successfully!";

    } catch (error) {

        console.error("Interaction Error:", error);

        status.textContent =
            "Course details are available, but activity could not be recorded.";
    }
}

// ==========================================
// 5. INITIALIZE APPLICATION
// ==========================================

document.addEventListener("DOMContentLoaded", function () {

    const itemContainer = document.getElementById("item-container");

    // Create search input
    const searchInput = document.createElement("input");

    searchInput.id = "search-input";
    searchInput.type = "text";
    searchInput.placeholder = "Search courses and articles...";

    searchInput.addEventListener("input", searchItems);

    if (itemContainer) {

        itemContainer.parentNode.insertBefore(
            searchInput,
            itemContainer
        );
    }

    // Load catalog
    loadItems();

});
