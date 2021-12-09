export async function getAllCustomers() {

    try{
        const response = await fetch('/api/customers');
        return await response.json();
    }catch(error) {
        return [];
    }

}

export async function createCustomer(customer) {
    const response = await fetch(`/api/customers`,
        {
        method: 'POST',
        headers: {'Content-Type': 'application/json'},
        body: JSON.stringify(customer)
        }
    )
    return await response.json();
}
