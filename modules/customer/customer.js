// Customer Management System
class CustomerManager {
    constructor() {
        this.customers = [];
        this.currentEditingId = null;
        this.filteredCustomers = [];
        this.sortOrder = 'default';
        this.init();
    }

    init() {
        this.loadCustomersFromStorage();
        this.setupEventListeners();
        this.displayCustomers();
    }

    setupEventListeners() {
        // Form submission
        document.getElementById('customerForm').addEventListener('submit', (e) => {
            e.preventDefault();
            this.saveCustomer();
        });

        // Clear form button
        document.querySelector('button[type="reset"]').addEventListener('click', () => {
            this.resetForm();
        });

        // Cancel edit button
        document.getElementById('cancelEditBtn').addEventListener('click', () => {
            this.cancelEdit();
        });

        // Search functionality
        document.getElementById('searchBtn').addEventListener('click', () => {
            this.searchCustomers();
        });

        document.getElementById('clearSearchBtn').addEventListener('click', () => {
            this.clearSearch();
        });

        document.getElementById('searchInput').addEventListener('keypress', (e) => {
            if (e.key === 'Enter') {
                this.searchCustomers();
            }
        });

        // Sort functionality
        document.getElementById('sortSelect').addEventListener('change', (e) => {
            this.sortOrder = e.target.value;
            this.displayCustomers(this.filteredCustomers.length > 0);
        });
    }

    generateId() {
        return 'C' + Date.now() + Math.random().toString(36).substr(2, 5).toUpperCase();
    }

    saveCustomer() {
        const name = document.getElementById('customerName').value.trim();
        const email = document.getElementById('customerEmail').value.trim();
        const phone = document.getElementById('customerPhone').value.trim();
        const address = document.getElementById('customerAddress').value.trim();
        const city = document.getElementById('customerCity').value.trim();

        if (!this.validateEmail(email)) {
            alert('Please enter a valid email address');
            return;
        }

        if (!this.validatePhone(phone)) {
            alert('Please enter a valid phone number');
            return;
        }

        if (this.currentEditingId) {
            // Update existing customer
            const customerIndex = this.customers.findIndex(c => c.id === this.currentEditingId);
            if (customerIndex !== -1) {
                this.customers[customerIndex] = {
                    id: this.currentEditingId,
                    name,
                    email,
                    phone,
                    address,
                    city
                };
                this.showMessage('Customer updated successfully!', 'success');
            }
            this.cancelEdit();
        } else {
            // Add new customer
            const newCustomer = {
                id: this.generateId(),
                name,
                email,
                phone,
                address,
                city
            };
            this.customers.push(newCustomer);
            this.showMessage('Customer added successfully!', 'success');
            this.resetForm();
        }

        this.saveCustomersToStorage();
        this.displayCustomers();
    }

    editCustomer(id) {
        const customer = this.customers.find(c => c.id === id);
        if (customer) {
            document.getElementById('customerId').value = customer.id;
            document.getElementById('customerName').value = customer.name;
            document.getElementById('customerEmail').value = customer.email;
            document.getElementById('customerPhone').value = customer.phone;
            document.getElementById('customerAddress').value = customer.address;
            document.getElementById('customerCity').value = customer.city;

            this.currentEditingId = id;
            document.getElementById('submitBtn').textContent = 'Update Customer';
            document.getElementById('cancelEditBtn').style.display = 'inline-block';

            // Scroll to form
            document.getElementById('customerForm').scrollIntoView({ behavior: 'smooth' });
        }
    }

    deleteCustomer(id) {
        if (confirm('Are you sure you want to delete this customer?')) {
            this.customers = this.customers.filter(c => c.id !== id);
            this.saveCustomersToStorage();
            this.displayCustomers();
            this.showMessage('Customer deleted successfully!', 'success');
        }
    }

    cancelEdit() {
        this.currentEditingId = null;
        this.resetForm();
        document.getElementById('submitBtn').textContent = 'Add Customer';
        document.getElementById('cancelEditBtn').style.display = 'none';
    }

    resetForm() {
        document.getElementById('customerForm').reset();
        document.getElementById('customerId').value = '';
        this.currentEditingId = null;
    }

    searchCustomers() {
        const searchTerm = document.getElementById('searchInput').value.trim().toLowerCase();

        if (!searchTerm) {
            alert('Please enter a search term');
            return;
        }

        this.filteredCustomers = this.customers.filter(customer => 
            customer.name.toLowerCase().includes(searchTerm) ||
            customer.email.toLowerCase().includes(searchTerm)
        );

        this.displayCustomers(true);
    }

    clearSearch() {
        document.getElementById('searchInput').value = '';
        this.filteredCustomers = [];
        this.displayCustomers();
    }

    displayCustomers(isFiltered = false) {
        const tbody = document.getElementById('customersTableBody');
        let customersToDisplay = isFiltered ? this.filteredCustomers : this.customers;

        // Apply sorting
        customersToDisplay = this.sortCustomers([...customersToDisplay]);

        // Update total count
        document.getElementById('totalCount').textContent = this.customers.length;

        if (customersToDisplay.length === 0) {
            tbody.innerHTML = '<tr><td colspan="8" class="text-center">No customers found</td></tr>';
            return;
        }

        tbody.innerHTML = customersToDisplay.map((customer, index) => `
            <tr>
                <td class="row-number">${index + 1}</td>
                <td><span class="customer-id">${customer.id}</span></td>
                <td><strong>${this.escapeHtml(customer.name)}</strong></td>
                <td>${this.escapeHtml(customer.email)}</td>
                <td>${this.escapeHtml(customer.phone)}</td>
                <td>${this.escapeHtml(customer.address)}</td>
                <td>${this.escapeHtml(customer.city)}</td>
                <td>
                    <div class="action-buttons">
                        <button class="btn btn-edit" onclick="customerManager.editCustomer('${customer.id}')" title="Edit customer">Edit</button>
                        <button class="btn btn-delete" onclick="customerManager.deleteCustomer('${customer.id}')" title="Delete customer">Delete</button>
                    </div>
                </td>
            </tr>
        `).join('');
    }

    sortCustomers(customers) {
        if (this.sortOrder === 'default') {
            return customers;
        }

        switch(this.sortOrder) {
            case 'name-asc':
                return customers.sort((a, b) => a.name.localeCompare(b.name));
            case 'name-desc':
                return customers.sort((a, b) => b.name.localeCompare(a.name));
            case 'email-asc':
                return customers.sort((a, b) => a.email.localeCompare(b.email));
            case 'city-asc':
                return customers.sort((a, b) => a.city.localeCompare(b.city));
            default:
                return customers;
        }
    }

    saveCustomersToStorage() {
        localStorage.setItem('customers', JSON.stringify(this.customers));
    }

    loadCustomersFromStorage() {
        const stored = localStorage.getItem('customers');
        this.customers = stored ? JSON.parse(stored) : [];
    }

    validateEmail(email) {
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        return emailRegex.test(email);
    }

    validatePhone(phone) {
        const phoneRegex = /^[\d\s\-\+\(\)]+$/;
        return phoneRegex.test(phone) && phone.length >= 7;
    }

    escapeHtml(text) {
        const map = {
            '&': '&amp;',
            '<': '&lt;',
            '>': '&gt;',
            '"': '&quot;',
            "'": '&#039;'
        };
        return text.replace(/[&<>"']/g, m => map[m]);
    }

    showMessage(message, type) {
        // Create message element
        const messageEl = document.createElement('div');
        messageEl.className = `message ${type}`;
        messageEl.textContent = message;

        // Insert at the top of container
        const container = document.querySelector('.container');
        container.insertBefore(messageEl, container.firstChild);

        // Auto remove after 3 seconds
        setTimeout(() => {
            messageEl.remove();
        }, 3000);
    }
}

// Initialize the customer manager when DOM is ready
let customerManager;
document.addEventListener('DOMContentLoaded', () => {
    customerManager = new CustomerManager();
});
