//API
const {app} = require('./app_setup')
const {commande} = require("./bdd/Commande");
const {ligneCommande} = require("./bdd/LigneCommande");
const {client} = require("./bdd/Client");

//Vérifie que l'utilisateur est connecté
async function isLogon(req) {
    return await getClientConnecte(req) != null;
}

async function getClientConnecte(req) {
    if (req.cookies === undefined || req.cookies["nom"] === undefined || req.cookies["mdp"] === undefined) {
        return null;
    }

    let nom = req.cookies["nom"]
    let mdp = req.cookies["mdp"]

    return await client.findOne({
        where: {
            "nom": nom,
            "mdp": mdp
        }
    });
}

//TODO test avec le catalogue
app.post("/mettre-au-panier/:idArticle", async (req, res) => {
    if (await isLogon(req)) {
        //Pas nécessaire de vérifier la présence du paramètre
        // Le fait que la propriété soit dans l'URL fait qu'elle est obligatoirement la
        let idArticle = req.params.idArticle;

        res.status(200);

        let clientConnecte = await getClientConnecte(req);
        let commandeEnCours = await commande.findOne({
            where: {
                id_client: clientConnecte.idClient,
                fini: false
            }
        });

        if (commandeEnCours === null) {
            commandeEnCours = await commande.create({
                id_client: clientConnecte.idClient
            });
        }

        let ligneEnCours = await ligneCommande.findOne({
            where: {
                idCommande: commandeEnCours.id_commande,
                idArticle: idArticle
            }
        });

        if (ligneEnCours === null) {
            await ligneCommande.create({
                idCommande: commandeEnCours.id_commande,
                idArticle: idArticle,
                quantite: 1
            }, {
                isNewRecord: true
            });
        } else {
            await ligneCommande.update({
                quantite: ligneEnCours.quantite + 1
            }, {
                where: {
                    idCommande: commandeEnCours.id_commande,
                    idArticle: idArticle
                }
            });
        }

        res.end();
    } else {
        res.status(403);
        res.end();
    }
});

app.post("/valider-commande", async (req, res) => {
    if (await isLogon(req)) {
        let clientConnecte = await getClientConnecte(req);
        let commandeEnCours = await commande.findOne({
            where: {
                id_client: clientConnecte.idClient,
                fini: false
            }
        });

        if (commandeEnCours === null) {
            res.status(404);

            return;
        } else {
            res.status(200);
        }

        await commandeEnCours.update({
            fini: true
        }, {
            where: {
                id_commande: commandeEnCours.id_commande,
                id_client: clientConnecte.idClient,
                fini: false
            }
        });

        res.end();
    } else {
        res.status(403);
        res.end();
    }
});

module.exports = {
    getClientConnecte,
    isLogon
}