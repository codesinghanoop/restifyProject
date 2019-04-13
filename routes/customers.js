import RestifyError from 'restify-errors'
import Customer from '../models/customers'

const customers = (Server) => {
    Server.get('/customers',async (req, res, next) => {
        try {
            const allCustomers =await Customer.find({});
            res.send(allCustomers);
            next();
        } catch (err) {
            return next(new RestifyError.InvalidContentError(err));
        }
    })
    Server.post('/customers', async (req, res, next) => {
        // //check if the content is in json format
        // if (!req.is('application/json')) {
        //     return next(new RestifyError.InvalidContentError("Expects 'application/json' "));
        // }
            const { email, name, balance } = req.body;
            const customer = new Customer({
                email,
                name,
                balance
            })
        try {
            const newCustomer =await customer.save();
            res.send({ message: 'customer detail is saved' })
            next();
        } catch (error) {
            return next(new RestifyError.InternalError(error.message));
        }
    })
    //To get a single customer
    Server.get('/customers/:id',async (req, res, next) => {
        const id = req.params.id;
        try {
            const customer = await Customer.findById(id);
            res.send(customer)
            next();
        } catch (error) {
            return next(new RestifyError.ResourceNotFoundError(`There is no customer with the id of ${id}`));
        }
    })

    // Update Customer
    Server.put('/customers/:id', async (req, res, next) => {
        const id = req.params.id;
        // // Check to ensure the content type is JSON format
        // if (!req.is('application/json')) {
        //     return next(new errors.InvalidContentError("Expects 'application/json' "));
        // }
        // Update the customer by their id and update their information with the incoming request
        try {
            const customer = await Customer.findOneAndUpdate({_id: id}, req.body);
            res.send({ message: 'customer details updated' });
            next();
        } catch (err) {
            return next(new RestifyError.ResourceNotFoundError(`There is no customer with the id of ${id}`));
        }
    });

// Delete customer
    Server.del('/customers/:id', async (req, res, next) => {
        const id = req.params.id;
        try {
            const customer = await Customer.findOneAndDelete({_id: id});
            res.send(204);
            next();
        } catch(err) {
            return next(new RestifyError.ResourceNotFoundError(`There is no customer with the id of ${id}`));
        }
    })

}

export default customers
