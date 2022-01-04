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
        let idArticle = req.params.idArticle;

        if (idArticle === undefined) {
            res.status(400);
            res.end();

            return;
        }

        res.status(200);

        let clientConnecte = await getClientConnecte(req);
        let commandeEnCours = await commande.findOne({
            where: {
                idClient: clientConnecte.idClient,
                fini: false
            }
        });

        if (commandeEnCours === null) {
            commandeEnCours = await commande.create({
                idClient: clientConnecte.idClient
            });
        }

        let ligneEnCours = await ligneCommande.findOne({
            where: {
                idCommande: commandeEnCours.idCommande,
                idArticle: idArticle
            }
        });

        if (ligneEnCours === null) {
            await ligneCommande.create({
                idCommande: commandeEnCours.idCommande,
                idArticle: idArticle,
                quantite: 1
            });
        } else {
            await ligneCommande.update({
                quantite: ligneEnCours.quantite + 1
            }, {
                where: {
                    idCommande: commandeEnCours.idCommande,
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

//TODO tester
app.post("/valider-commande/:idCommande", async (req, res) => {
    if (await isLogon(req)) {
        let idCommande = req.params.idCommande;

        //TODO nécessaire ?
        if (idCommande === undefined) {
            res.status(400);
            res.end();

            return;
        }

        let clientConnecte = await getClientConnecte(req);
        let commandeEnCours = await commande.findOne({
            where: {
                idCommande: idCommande,
                idClient: clientConnecte.idClient,
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
                idCommande: idCommande,
                idClient: clientConnecte.idClient,
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