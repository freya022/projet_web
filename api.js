//API
const {app} = require('./app_setup')
const {commande} = require("./bdd/Commande");
const {ligneCommande} = require("./bdd/LigneCommande");
const {client} = require("./bdd/Client");

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

app.get("/mettre-au-panier", async (req, res) => {
    if (await isLogon(req)) {
        if (req.body.idArticle === undefined) {
            res.status(400);
            res.end();

            return;
        }

        res.status(200);

        let clientConnecte = getClientConnecte(req);
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

        let idArticle = req.header("idArticle");

        let ligneEnCours = await commande.findOne({
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

module.exports = {
    getClientConnecte
}