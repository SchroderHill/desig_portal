import initSqlJs from 'sql.js';
import wasmUrl from 'sql.js/dist/sql-wasm.wasm?url';
import {measurement} from './geometry.js';
let sql;
function geometryBlob(g) {
  const line=g.type==='LineString',rings=line?[g.coordinates]:g.coordinates;
  const count=rings.reduce((s,r)=>s+r.length,0),size=8+1+4+4+(line?0:4*rings.length)+16*count;
  const bytes=new Uint8Array(size),v=new DataView(bytes.buffer);bytes.set([71,80,0,1]);v.setInt32(4,2193,true);
  let o=8;v.setUint8(o++,1);v.setUint32(o,line?2:3,true);o+=4;v.setUint32(o,line?count:rings.length,true);o+=4;
  for(const r of rings){if(!line){v.setUint32(o,r.length,true);o+=4;}for(const p of r){v.setFloat64(o,p[0],true);v.setFloat64(o+8,p[1],true);o+=16;}}
  return bytes;
}
export async function createGeoPackage(layers,options={}) {
  sql??=initSqlJs({locateFile:()=>wasmUrl,...options});const SQL=await sql,db=new SQL.Database();
  try {
    db.run(`PRAGMA application_id=1196444487; PRAGMA user_version=10300;
      CREATE TABLE gpkg_spatial_ref_sys (srs_name TEXT NOT NULL,srs_id INTEGER NOT NULL PRIMARY KEY,organization TEXT NOT NULL,organization_coordsys_id INTEGER NOT NULL,definition TEXT NOT NULL,description TEXT);
      CREATE TABLE gpkg_contents (table_name TEXT NOT NULL PRIMARY KEY,data_type TEXT NOT NULL,identifier TEXT UNIQUE,description TEXT DEFAULT '',last_change DATETIME NOT NULL DEFAULT (strftime('%Y-%m-%dT%H:%M:%fZ','now')),min_x DOUBLE,min_y DOUBLE,max_x DOUBLE,max_y DOUBLE,srs_id INTEGER);
      CREATE TABLE gpkg_geometry_columns (table_name TEXT NOT NULL,column_name TEXT NOT NULL,geometry_type_name TEXT NOT NULL,srs_id INTEGER NOT NULL,z TINYINT NOT NULL,m TINYINT NOT NULL,PRIMARY KEY(table_name,column_name));`);
    const wkt='PROJCS["NZGD2000 / New Zealand Transverse Mercator 2000",GEOGCS["NZGD2000",DATUM["New_Zealand_Geodetic_Datum_2000",SPHEROID["GRS 1980",6378137,298.257222101]],PRIMEM["Greenwich",0],UNIT["degree",0.0174532925199433]],PROJECTION["Transverse_Mercator"],PARAMETER["latitude_of_origin",0],PARAMETER["central_meridian",173],PARAMETER["scale_factor",0.9996],PARAMETER["false_easting",1600000],PARAMETER["false_northing",10000000],UNIT["metre",1],AUTHORITY["EPSG","2193"]]';
    for(const row of [['Undefined Cartesian',-1,'NONE',-1,'undefined'],['Undefined geographic',0,'NONE',0,'undefined'],['WGS 84',4326,'EPSG',4326,'GEOGCS["WGS 84",DATUM["WGS_1984",SPHEROID["WGS 84",6378137,298.257223563]],PRIMEM["Greenwich",0],UNIT["degree",0.0174532925199433]]'],['NZTM2000',2193,'EPSG',2193,wkt]])db.run('INSERT INTO gpkg_spatial_ref_sys VALUES (?,?,?,?,?,NULL)',row);
    for(const [name,features] of Object.entries(layers)) {
      if(!/^[a-z_]+$/.test(name))throw Error('Invalid export layer');
      const type=name==='roads'?'LINESTRING':'POLYGON';
      db.run(`CREATE TABLE ${name} (fid INTEGER PRIMARY KEY AUTOINCREMENT, geom ${type}, source_id TEXT, name TEXT, part INTEGER, length_m REAL, area_m2 REAL, properties TEXT)`);
      db.run('INSERT INTO gpkg_contents (table_name,data_type,identifier,srs_id) VALUES (?,?,?,2193)',[name,'features',name]);
      db.run('INSERT INTO gpkg_geometry_columns VALUES (?,?,?,2193,0,0)',[name,'geom',type]);
      db.run('BEGIN');
      for(const f of features)db.run(`INSERT INTO ${name} (geom,source_id,name,part,length_m,area_m2,properties) VALUES (?,?,?,?,?,?,?)`,[geometryBlob(f.geometry),f.properties.source_id??'',f.properties.name??name,f.properties.part??1,type==='LINESTRING'?measurement(f.geometry):null,type==='POLYGON'?measurement(f.geometry):null,JSON.stringify(f.properties)]);
      db.run('COMMIT');
    }
    return db.export();
  }finally{db.close();}
}
