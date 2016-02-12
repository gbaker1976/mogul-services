module.exports = {
    formatPageEntityPayload: function( entity ){
        var pyl = {
            meta: {
                rels: {
                    pages: '/pages/' + entity.page_id + '/regions',
                    aliases: '/pages/' + entity.page_id + '/aliases'
                },
                actions: {
                    preview: '/actions/preview/page/' + entity.page_id,
                    copy: '/actions/copy/page/' + entity.page_id,
                    publish: '/actions/publish/page/' + entity.page_id,
                    unpublish: '/actions/unpublish/page/' + entity.page_id
                }
            },
            entity: entity
        };

        return pyl;
    },

    formatPageListPayload: function( list ){
        var pyl = {
            meta: {
                count: list.length,
                page: 1,
                pageSize: 50,
                links: {
                    next: '/pages?page=2'
                }
            },
            entities: list
        };

        return pyl;
    },

    formatRegionEntityPayload: function( entity ){
        var pyl = {
            meta: {
                rels: {
                    contents: '/regions/' + entity.region_id + '/regions'
                },
                actions: {
                    copy: '/actions/copy/region/' + entity.region_id
                }
            },
            entity: entity
        };

        return pyl;
    },

    formatSiteListPayload: function( list ){
        var pyl = {
            meta: {
                count: list.length,
                page: 1,
                pageSize: 50,
                links: {
                    next: '/sites?page=2'
                }
            },
            entities: list
        };

        return pyl;
    },

    formatSiteEntityPayload: function( entity ){
        var pyl = {
            meta: {
                rels: {
                    pages: '/sites/' + entity.site_id + '/pages',
                    aliases: '/sites/' + entity.site_id + '/aliases'
                },
                actions: {
                    preview: '/actions/preview/site/' + entity.site_id,
                    copy: '/actions/copy/site/' + entity.site_id,
                    publish: '/actions/publish/site/' + entity.site_id,
                    unpublish: '/actions/unpublish/site/' + entity.site_id
                }
            },
            entity: entity
        };

        return pyl;
    },

    formatSiteAliasListPayload: function( id, list ){
        var pyl = {
            meta: {
                count: list.length,
                page: 1,
                pageSize: 50,
                links: {
                    next: '/sites/' + id + '/aliases?page=2'
                }
            },
            entities: list
        };

        return pyl;
    },

    formatPageAliasListPayload: function( id, list ){
        var pyl = {
            meta: {
                count: list.length,
                page: 1,
                pageSize: 50,
                links: {
                    next: '/pages/' + id + '/aliases?page=2'
                }
            },
            entities: list
        };

        return pyl;
    }
};
