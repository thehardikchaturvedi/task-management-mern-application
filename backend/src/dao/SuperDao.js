class SuperDao {
    constructor(model) {
        this.Model = model;
    }

    async findAll() {
        return this.Model.findAll();
    }

    async findById(id) {
        return this.Model.findOne({where: {id}});
    }

    async findOneByWhere({where, attributes = null, include = [], order = []}) {
        return this.Model.findOne({
            where,
            ...(attributes ? {attributes} : {}),
            include,
            order
        });
    }

    async updateWhere(data, where) {
        return this.Model.update(data, {where, returning: true});
    }

    async updateById(data, id) {
        return this.Model.update(data, {where: {id}});
    }

    async create(data) {
        const newData = new this.Model(data);
        return newData.save();
    }

    async findByWhere({
                          findTotal = true,
                          distinct,
                          col,
                          where,
                          attributes = undefined,
                          order = ["id", "asc"],
                          limit = null,
                          offset = null,
                          include = undefined,
                          group = null
                      }) {
        return this.Model[findTotal ? "findAndCountAll" : "findAll"]({
            ...(distinct ? {distinct} : {}), // work for findAndCountAll, get distinct count
            ...(distinct && col ? {col} : {}), // // work for findAndCountAll, get distinct count on specific column
            where,
            ...(attributes ? {attributes} : {}),
            order: [order],
            ...(group ? {group} : {}),
            limit,
            offset,
            ...(include ? {include} : {})
        });
    }

    async deleteByWhere({where}) {
        return this.Model.destroy({where});
    }
}

module.exports = SuperDao;
