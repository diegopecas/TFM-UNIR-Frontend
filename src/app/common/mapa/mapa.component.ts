import { AfterViewInit, Component, OnChanges, OnInit, SimpleChanges } from '@angular/core';
import { Router } from '@angular/router';
import "leaflet";
import * as shp from "shpjs";
declare let L:any;

@Component({
  selector: 'app-mapa',
  templateUrl: './mapa.component.html'
})
export class MapaComponent implements OnInit, AfterViewInit, OnChanges {
  
  private map: any;

  public coordenadas = {
    latitud: 0,
    longitud: 0,
  };

  private mapaBaseOSM = L.tileLayer(
    "https://{s}.tile.openstreetmap.org/{z}/{x}/{y}.png",
    {
      maxZoom: 18,
      minZoom: 3,
      attribution:
        '&copy; <a href="http://www.openstreetmap.org/copyright">OpenStreetMap</a>',
    }
  );

  private mapaBaseESRI = L.tileLayer(
    "https://server.arcgisonline.com/ArcGIS/rest/services/World_Street_Map/MapServer/tile/{z}/{y}/{x}",
    {
      attribution:
        "Tiles &copy; Esri &mdash; Source: Esri, DeLorme, NAVTEQ, USGS, Intermap, iPC, NRCAN, Esri Japan, METI, Esri China (Hong Kong), Esri (Thailand), TomTom, 2012",
    }
  );

  constructor(
    private router: Router
  ) {
    // This is intentional
  }
  ngOnChanges(changes: SimpleChanges): void {
    // throw new Error('Method not implemented.');
  }
  ngAfterViewInit(): void {
    // throw new Error('Method not implemented.');
  }

  ngOnInit(): void {
    // This is intentional
    this.initMap();
  }

  private initMap(): void {
    this.map = L.map("map", {
      center: [4, -72],
      zoom: 6,
    });

    this.mapaBaseESRI.addTo(this.map);

    // this.configurarCapas();

    this.map.on("click", (e: any) => {
      this.coordenadas.latitud = e.latlng.lat;
      this.coordenadas.longitud = e.latlng.lng;

      console.log("XY", this.coordenadas);
      console.log("evento", e);
    });

    const geo = L.geoJson(
			{ features: [] },
			{
				onEachFeature: function popUp(f:any, l:any) {
					const out = [];
					if (f.properties) {
						for (const key of Object.keys(f.properties)) {
							out.push(key + " : " + f.properties[key]);
						}
						l.bindPopup(out.join("<br />"));
					}
				}
			}
		).addTo(this.map);

		const base = "http://localhost:4200/assets/mapas/ap.zip";
		/*shp(base).then((data:any) => {
			// geo.addData(data);
      console.log('geo json', data);
		});*/

    this.loadShapeFile(base);
  }

  isFetchingShapeFile = false;
  public mapObject: any;
  public coordinateObject: any;
  topLayeredShapeFile: any;

  loadShapeFile(baseUrl: string) {
		this.isFetchingShapeFile = true;
		var shpfile = new L.Shapefile(baseUrl, {
			onEachFeature: (feature:any, layer:any) => {
				layer.on('click', (e:any) => {
					console.log(e);
					this.mapObject = e.target.feature.properties;
					this.coordinateObject = e.latlng;
				});
				this.map.fitBounds(layer.getBounds(), { maxZoom: 11 });
			}
		});
		this.topLayeredShapeFile = shpfile;
		shpfile.addTo(this.map);
		this.isFetchingShapeFile = false
	}

}
