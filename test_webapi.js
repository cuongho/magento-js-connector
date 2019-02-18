/**
 *@NApiVersion 2.x
 *@NScriptType UserEventScript
 */
define(['N/record', 'N/https', '/SuiteScripts/Magento/oauth', '/SuiteScripts/Magento/secret'], function (record, https, oauth, secret) {
    function afterSubmit(context) {
        var url = secret.host + 'indaba-netsuite-account/';
        var method = 'POST';
        var headers = oauth.getHeaders({
            url: url,
            method: method,
            tokenKey: secret.token.public,
            tokenSecret: secret.token.secret
        });

        headers['Content-Type'] = 'application/json';

        var data = {
            net_suite_account: {
                net_suite_account_id: 703860,
                email: 'cuong@forixwebdesign.com',
                sales_rep: 'test',
                territory: 'test',
                price_level: 'test',
                price_level_id: '1',
                terms: '1234567',
                terms_id: '1234556',

            }
        };
        var restResponse = https.post.promise({
            url: url,
            headers: headers,
            body: JSON.stringify(data)
        }).then(function (response) {
            log.debug({
                title: 'Response',
                details: JSON.stringify(response)
            });
        }).catch(function onRejected(reason) {
            log.debug({
                title: 'Invalid Request: ',
                details: reason
            });
        });


    }

    return {

        afterSubmit: afterSubmit
    };
});