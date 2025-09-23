class BaseService {
    constructor(model) {
        this.model = model;
    }

    async save(data) {
        if(data.hasOwnProperty('id') && data.id !== ""){
            return await this.update(data.id, data);
        }
        return await this.create(data);
    }

    async create(data) {
        const doc = new this.model(data);
        return await doc.save();
    }

    async getAll() {
        return await this.model.find();
    }

    async getById(id) {
        return await this.model.findById(id);
    }

    async update(id, data) {
        return await this.model.findByIdAndUpdate(id, data, {
            new: true,
            runValidators: true
        });
    }

    async delete(id) {
        return await this.model.findByIdAndDelete(id);
    }

    async deleteAll() {
        return await this.model.deleteMany({});
    }

}

export default BaseService;
