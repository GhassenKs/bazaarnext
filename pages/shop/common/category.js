import { pathToArray } from 'graphql/jsutils/Path';
import React, { useState, useContext } from 'react';
import { Collapse } from 'reactstrap';
import FilterContext from '../../../helpers/filter/FilterContext';

const Category = () => {
    const context = useContext(FilterContext);
    const [isCategoryOpen, setIsCategoryOpen] = useState(true);
    const toggleCategory = () => setIsCategoryOpen(!isCategoryOpen);
    const setSelectedCategory = context.setSelectedCategory;
    const [url, setUrl] = useState();
    const cat = context.state;
    
    
    

    const updateCategory = (category) => {
        context.setSelectedBrands([])
        const pathname = window.location.pathname;
        setUrl(pathname);
        setSelectedCategory(category);
      

    }

   const querylink = window.location.search;
   const urlParams = new URLSearchParams(querylink)
   const catg = urlParams.get('category')


    const type = ((catg === 'Dresses') || (catg === 'Skirts')|| (catg === 'Ftshirts') || (catg === 'Fjeans')|| (catg === 'Fsports')|| (catg === 'Fshoes')|| (catg === 'Fjackets')
   || (catg === 'Fall')|| (catg === 'Fnecklaces')|| (catg === 'Fbraceletsrings')|| (catg === 'Fcapshats')|| (catg === 'Fpursesbags')|| (catg === 'Ffragrances')) ?
   (
    <div className="collection-collapse-block open">
    <h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
    <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
                <ul className="category-list">
                   <li><p className="font-weight-bold">Mode Femme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Dresses")}>Robes</a></li>
                    <li><a href={null} onClick={() => updateCategory("Skirts")}>Jupes</a></li>
                    <li><a href={null} onClick={() => updateCategory("Ftshirts")}>T-shirts</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fjackets")}>Gilet</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fjeans")}>Jeans </a></li>
                    <li><a href={null} onClick={() => updateCategory("Fsports")}>Tenue de sport</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fshoes")}>Chaussures</a></li>
                    <li><p className="font-weight-bold">Accesoires femme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Fnecklaces")}>Colliers</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fbraceletsrings")}>Accessoires femme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fcapshats")}>Chapeau femme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fpursesbags")}>Sac femme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Ffragrances")}>Parfum de femmme</a></li>
                   
                    
                </ul>
            </div>
        </div>
    </Collapse>
</div>
     ) :( (catg === 'Makeup') || (catg === 'Skincare')|| (catg === 'Haircare')) ?
     (
        <div className="collection-collapse-block open">
        <h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
        <Collapse isOpen={isCategoryOpen}>
            <div className="collection-collapse-block-content">
                <div className="collection-brand-filter">
                    <ul className="category-list">
                       
                        <li><p className="font-weight-bold">Soin</p></li>
                        <li><a href={null} onClick={() => updateCategory("Makeup")}>Maquillage</a></li>
                    <li><a href={null} onClick={() => updateCategory("Skincare")}>Soin femme</a></li>
                        <li><a href={null} onClick={() => updateCategory("Haircare")}>Soin cheveux</a></li>
                        
                        
                    </ul>
                </div>
            </div>
        </Collapse>
    </div>
     )
     
     
     
     




     :     (( catg === 'Msweater') || (catg === 'Mshirts')|| (catg === 'MBlazers')|| (catg === 'Mjeans')|| (catg === 'Mall')|| (catg === 'Mjackets')|| (catg === 'Mblazers')
     || (catg === 'Mnecklaces')|| (catg === 'Mbraceletsrings')|| (catg === 'Mcapshats')|| (catg === 'Mbags')|| (catg === 'Mfragrances')|| (catg === 'Msports')|| (catg === 'Mshoes')) ?
   ( <div className="collection-collapse-block open">
    <h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
    <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
                <ul className="category-list">
                   <li><p className="font-weight-bold">Mode Homme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Mshirts")}>chemise homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Msweater")}>Pull homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mjeans")}>Jeans</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mjackets")}>Gilet </a></li>
                    <li><a href={null} onClick={() => updateCategory("Mblazers")}>Blazers </a></li>
                    <li><a href={null} onClick={() => updateCategory("Msports")}>tenue de sport</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mshoes")}>Chaussures</a></li>
                    <li><p className="font-weight-bold">Accessoires homme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Mnecklaces")}>colliers homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mbraceletsrings")}>=Accessoires homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mcapshats")}>Chapeau homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mbags")}>Sac homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mfragrances")}>Parfum homme</a></li>
                    
                </ul>
            </div>
        </div>
    </Collapse>
</div>

) :  (( catg === 'tables') || (catg === 'chairs')|| (catg === 'desks')|| (catg === 'beds')|| (catg === 'allF')
|| (catg === 'televisions')|| (catg === 'projectors')|| (catg === 'tvreceivers')|| (catg === 'Sspeakers')|| (catg === 'microwaves')|| (catg === 'lights')|| (catg === 'frigs')   ) ? 
( <div className="collection-collapse-block open">
<h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
<Collapse isOpen={isCategoryOpen}>
    <div className="collection-collapse-block-content">
        <div className="collection-brand-filter">
            <ul className="category-list">
               <li><p className="font-weight-bold">Furniture</p></li>
                <li><a href={null} onClick={() => updateCategory("chairs")}>chaises</a></li>
                <li><a href={null} onClick={() => updateCategory("Tables")}>Tables</a></li>
                <li><a href={null} onClick={() => updateCategory("beds")}>Lits</a></li>
                <li><a href={null} onClick={() => updateCategory("desks")}>Bureaux</a></li>
                <li><a href={null} onClick={() => updateCategory("dressers")}>Commodes</a></li>
                <li><p className="font-weight-bold">Home Entertainment</p></li>
                <li><a href={null} onClick={() => updateCategory("televisions")}>Televisions</a></li>
                <li><a href={null} onClick={() => updateCategory("TVreceivers")}>Recepteurs TV</a></li>
                <li><a href={null} onClick={() => updateCategory("projectors")}>Projecteurs </a></li>
                <li><a href={null} onClick={() => updateCategory("Sspeakers")}>Haut parleurs</a></li>
                <li><p className="font-weight-bold">Home Appliances</p></li>
                <li><a href={null} onClick={() => updateCategory("microwaves")}>Micro-ondes</a></li>
                <li><a href={null} onClick={() => updateCategory("lights")}>Lumieres</a></li>
                <li><a href={null} onClick={() => updateCategory("frigs")}>Refrigerateurs</a></li>
                
                
            </ul>
        </div>
    </div>
</Collapse>
</div>

):  (( catg === 'digitalcameras') || (catg === 'securitycameras')|| (catg === 'Caccessories')|| (catg === 'headphonesnearphones')|| (catg === 'speakers')
|| (catg === 'radios')|| (catg === 'desktopC')|| (catg === 'laptops')  ) ? 
( <div className="collection-collapse-block open">
<h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
<Collapse isOpen={isCategoryOpen}>
    <div className="collection-collapse-block-content">
        <div className="collection-brand-filter">
            <ul className="category-list">
                
               <li><p className="font-weight-bold">Cameras</p></li>
                <li><a href={null} onClick={() => updateCategory("digitalcameras")}>Digital cameras</a></li>
                <li><a href={null} onClick={() => updateCategory("securitycameras")}>Security cameras</a></li>
                <li><a href={null} onClick={() => updateCategory("Caccessories")}>Camera Accessories</a></li>
                
                <li><p className="font-weight-bold">Audio</p></li>
                <li><a href={null} onClick={() => updateCategory("Headphonesnearphones")}>Headphones & Earphones</a></li>
                <li><a href={null} onClick={() => updateCategory("speakers")}>Speakers</a></li>
                <li><a href={null} onClick={() => updateCategory("radios")}>Radios</a></li>

                <li><p className="font-weight-bold">Ordinateurs</p></li>
                <li><a href={null} onClick={() => updateCategory("desktopC")}>Ordinateurs de bureau</a></li>
                <li><a href={null} onClick={() => updateCategory("laptops")}>Ordinateur portable</a></li>
                
                
                
               
                
                
            </ul>
        </div>
    </div>
</Collapse>
</div>

)




:  (( catg === 'fruits') || (catg === 'vegetables')|| (catg === 'beverages')|| (catg === 'domesticC')  ) ? 
( <div className="collection-collapse-block open">
<h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
<Collapse isOpen={isCategoryOpen}>
    <div className="collection-collapse-block-content">
        <div className="collection-brand-filter">
            <ul className="category-list">
               <li><p className="font-weight-bold">épicerie</p></li>
               <li><a href={null} onClick={() => updateCategory("fruits")}>Fruit</a></li>
                <li><a href={null} onClick={() => updateCategory("vegetables")}>vegetables</a></li>
                <li><a href={null} onClick={() => updateCategory("domesticC")}>Produit de nettoyage</a></li>
                <li><a href={null} onClick={() => updateCategory("beverages")}>Boisson</a></li>
                
               
                
                
            </ul>
        </div>
    </div>
</Collapse>
</div>

) : (( catg === 'treats') || (catg === 'phealthsupplies')|| (catg === 'pfurnitures')|| (catg === 'ptoys')|| (catg === 'pgrooming')
|| (catg === 'pcleaning') ) ? 
( <div className="collection-collapse-block open">
<h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
<Collapse isOpen={isCategoryOpen}>
    <div className="collection-collapse-block-content">
        <div className="collection-brand-filter">
            <ul className="category-list">
                <li><p className="font-weight-bold">Animaux</p></li>
                 <li><a href={null} onClick={() => updateCategory("treats")}>Friandises</a></li>
                <li><a href={null} onClick={() => updateCategory("phealthsupplies")}>Suppléments de santé</a></li>
                <li><a href={null} onClick={() => updateCategory("pfurniture")}>Fournitures</a></li>
                <li><a href={null} onClick={() => updateCategory("ptoys")}>Jouets</a></li>
                <li><a href={null} onClick={() => updateCategory("pgrooming")}>Nettoyage</a></li>
                
                

               
                
                
            </ul>
        </div>
    </div>
</Collapse>
</div>

):(( catg === 'bsupplies') || (catg === 'electrical')|| (catg === 'hardware')|| (catg === 'fixtures')|| (catg === 'bulbs')
|| (catg === 'wallsupplies')|| (catg === 'pnhandtools')|| (catg === 'plumbing') ) ? 
( <div className="collection-collapse-block open">
<h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
<Collapse isOpen={isCategoryOpen}>
    <div className="collection-collapse-block-content">
        <div className="collection-brand-filter">
            <ul className="category-list">
                <li><p className="font-weight-bold">Outils</p></li>
                <li><a href={null} onClick={() => updateCategory("bsupplies")}>Materiaux de construction</a></li>
                <li><a href={null} onClick={() => updateCategory("electrical")}>Materiel electrique</a></li>
                <li><a href={null} onClick={() => updateCategory("bulbs")}>Ampoules</a></li>
                <li><a href={null} onClick={() => updateCategory("wallsupplies")}>Materiel de peinture</a></li>
                

                

               
                
                
            </ul>
        </div>
    </div>
</Collapse>
</div>

):(( catg === 'proteinbars') || (catg === 'wsupplies')|| (catg === 'multivitamins')|| (catg === 'immunesupport') ) ? 
( <div className="collection-collapse-block open">
<h3 className="collapse-block-title" onClick={toggleCategory}>Categorie</h3>
<Collapse isOpen={isCategoryOpen}>
    <div className="collection-collapse-block-content">
        <div className="collection-brand-filter">
            <ul className="category-list">
                <li><p className="font-weight-bold">Fitness</p></li>
                <li><a href={null} onClick={() => updateCategory("proteinbars")}>barres protéinées</a></li>
                <li><a href={null} onClick={() => updateCategory("wsupplies")}>Pré & post entraînement</a></li>
                <li><a href={null} onClick={() => updateCategory("multivitamins")}>Multivitamins</a></li>
               
               

                
            </ul>
        </div>
    </div>
</Collapse>
</div>

): (( catg === 'all') || ( catg === '') || ( catg === undefined) ) ? 
(
    <div className="collection-collapse-block open">
    <h3 className="collapse-block-title" onClick={toggleCategory}>Category</h3>
    <Collapse isOpen={isCategoryOpen}>
        <div className="collection-collapse-block-content">
            <div className="collection-brand-filter">
                <ul className="category-list">
                <li><p className="font-weight-bold">Mode Femme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Dresses")}>Robes</a></li>
                    <li><a href={null} onClick={() => updateCategory("Skirts")}>Jupes</a></li>
                    <li><a href={null} onClick={() => updateCategory("Ftshirts")}>T-shirts</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fjackets")}>Gilet</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fjeans")}>Jeans </a></li>
                    <li><a href={null} onClick={() => updateCategory("Fsports")}>Tenue de sport</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fshoes")}>Chaussures</a></li>
                    <li><p className="font-weight-bold">Accesoires femme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Fnecklaces")}>Colliers</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fbraceletsrings")}>Accessoires femme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fcapshats")}>Chapeau femme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Fpursesbags")}>Sac femme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Ffragrances")}>Parfum de femmme</a></li>
                    <li><p className="font-weight-bold">Soin</p></li>
                        <li><a href={null} onClick={() => updateCategory("Makeup")}>Maquillage</a></li>
                    <li><a href={null} onClick={() => updateCategory("Skincare")}>Soin femme</a></li>
                        <li><a href={null} onClick={() => updateCategory("Haircare")}>Soin cheveux</a></li>
                        <li><p className="font-weight-bold">Mode Homme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Mshirts")}>chemise homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Msweater")}>Pull homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mjeans")}>Jeans</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mjackets")}>Gilet </a></li>
                    <li><a href={null} onClick={() => updateCategory("Mblazers")}>Blazers </a></li>
                    <li><a href={null} onClick={() => updateCategory("Msports")}>tenue de sport</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mshoes")}>Chaussures</a></li>
                    <li><p className="font-weight-bold">Accessoires homme</p></li>
                    <li><a href={null} onClick={() => updateCategory("Mnecklaces")}>colliers homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mbraceletsrings")}>=Accessoires homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mcapshats")}>Chapeau homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mbags")}>Sac homme</a></li>
                    <li><a href={null} onClick={() => updateCategory("Mfragrances")}>Parfum homme</a></li>
                    <li><p className="font-weight-bold">Furniture</p></li>
                    <li><a href={null} onClick={() => updateCategory("chairs")}>chaises</a></li>
                    <li><a href={null} onClick={() => updateCategory("Tables")}>Tables</a></li>
                    <li><a href={null} onClick={() => updateCategory("beds")}>Lits</a></li>
                    <li><a href={null} onClick={() => updateCategory("desks")}>Bureaux</a></li>
                    <li><a href={null} onClick={() => updateCategory("dressers")}>Commodes</a></li>
                    <li><p className="font-weight-bold">Divertissement</p></li>
                    <li><a href={null} onClick={() => updateCategory("televisions")}>Televisions</a></li>
                    <li><a href={null} onClick={() => updateCategory("TVreceivers")}>Recepteurs TV</a></li>
                    <li><a href={null} onClick={() => updateCategory("projectors")}>Projecteurs </a></li>
                    <li><a href={null} onClick={() => updateCategory("Sspeakers")}>Haut parleurs</a></li>
                    <li><p className="font-weight-bold">Electromenagérs</p></li>
                    <li><a href={null} onClick={() => updateCategory("microwaves")}>Micro-ondes</a></li>
                    <li><a href={null} onClick={() => updateCategory("lights")}>Lumieres</a></li>
                    <li><a href={null} onClick={() => updateCategory("frigs")}>Refrigerateurs</a></li>
                    <li><p className="font-weight-bold">Cameras</p></li>
                    <li><a href={null} onClick={() => updateCategory("digitalcameras")}>Digital cameras</a></li>
                    <li><a href={null} onClick={() => updateCategory("securitycameras")}>Security cameras</a></li>
                    <li><a href={null} onClick={() => updateCategory("Caccessories")}>Camera Accessories</a></li>
                    
                    <li><p className="font-weight-bold">Audio</p></li>
                    <li><a href={null} onClick={() => updateCategory("Headphonesnearphones")}>Headphones & Earphones</a></li>
                    <li><a href={null} onClick={() => updateCategory("speakers")}>Speakers</a></li>
                    <li><a href={null} onClick={() => updateCategory("radios")}>Radios</a></li>

                    <li><p className="font-weight-bold">Ordinateurs</p></li>
                    <li><a href={null} onClick={() => updateCategory("desktopC")}>Ordinateurs de bureau</a></li>
                    <li><a href={null} onClick={() => updateCategory("laptops")}>Ordinateur portable</a></li>
                    <li><p className="font-weight-bold">épicerie</p></li>
                    <li><a href={null} onClick={() => updateCategory("fruits")}>Fruit</a></li>
                    <li><a href={null} onClick={() => updateCategory("vegetables")}>vegetables</a></li>
                    <li><a href={null} onClick={() => updateCategory("domesticC")}>Produit de nettoyage</a></li>
                    <li><a href={null} onClick={() => updateCategory("beverages")}>Boisson</a></li>
                    <li><p className="font-weight-bold">Animaux</p></li>
                 <li><a href={null} onClick={() => updateCategory("treats")}>Friandises</a></li>
                <li><a href={null} onClick={() => updateCategory("phealthsupplies")}>Suppléments de santé</a></li>
                <li><a href={null} onClick={() => updateCategory("pfurniture")}>Fournitures</a></li>
                <li><a href={null} onClick={() => updateCategory("ptoys")}>Jouets</a></li>
                <li><a href={null} onClick={() => updateCategory("pgrooming")}>Nettoyage</a></li>
                <li><p className="font-weight-bold">Outils</p></li>
                <li><a href={null} onClick={() => updateCategory("bsupplies")}>Materiaux de construction</a></li>
                <li><a href={null} onClick={() => updateCategory("electrical")}>Materiel electrique</a></li>
                <li><a href={null} onClick={() => updateCategory("bulbs")}>Ampoules</a></li>
                <li><a href={null} onClick={() => updateCategory("wallsupplies")}>Materiel de peinture</a></li>
                <li><p className="font-weight-bold">Fitness</p></li>
                <li><a href={null} onClick={() => updateCategory("proteinbars")}>barres protéinées</a></li>
                <li><a href={null} onClick={() => updateCategory("wsupplies")}>Pré & post entraînement</a></li>
                <li><a href={null} onClick={() => updateCategory("multivitamins")}>Multivitamins</a></li>

                
                    
                </ul>
            </div>
        </div>
    </Collapse>
</div>

)


: ''
    
return(type)

}

export default Category;