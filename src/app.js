import * as THREE from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/build/three.module.js';
import { OrbitControls } from 'https://threejsfundamentals.org/threejs/resources/threejs/r125/examples/jsm/controls/OrbitControls.js';

let camera = new THREE.PerspectiveCamera(75, window.innerWidth / window.innerHeight, 0.1, 1000);

const renderer = new THREE.WebGLRenderer();
renderer.setSize(window.innerWidth, window.innerHeight);
document.body.appendChild(renderer.domElement);

const scene = new THREE.Scene();

const controls = new OrbitControls(camera, renderer.domElement);

const neutron_wall = new THREE.Group();

function create_neutron_wall(scene, neutron_wall, bar_num, x_dist, y_dist, z_dist, spacing, dist_bw_neutron_veto)
{
    for (let i = 0; i < bar_num; i++) {
        const geometry = new THREE.BoxGeometry(x_dist, y_dist, z_dist);
        let materialProperties;
        if (i % 2 == 0) {
            materialProperties = {
                color: "hsl(228, 100%, 78%)",
            };
        } else {
            materialProperties = {
                color: "hsl(228, 100%, 50%)",
            };
        }
        let material = new THREE.MeshBasicMaterial(materialProperties);
        const bar = new THREE.Mesh(geometry, material);
        bar.position.x += x_dist/2;
    
        if(i != 0)
        {
            bar.position.y += i * (y_dist + spacing);
        }
        
        neutron_wall.add(bar);
    }
    
    scene.add(neutron_wall);
    neutron_wall.position.z -= dist_bw_neutron_veto;
}

create_neutron_wall(scene, neutron_wall, 24, 193.675, 8.255, 6.985, .3175, 100); //DIST BW N-WALL AND V-WALL NOT CORRECT

//veto wall
const veto_wall = new THREE.Group();

function create_veto_wall(scene, veto_wall, bar_num, x_dist, y_dist, z_dist, x_spacing, z_spacing)
{
    for(let i = 1; i <= 23; i++)
    {
        let zigzag = z_spacing;
        const geometry = new THREE.BoxGeometry(x_dist, y_dist, z_dist);
        let materialProperties;
        if (i % 2 != 0) {
            materialProperties = {
                color: "hsl(320, 0%, 79%)",
            };
            zigzag *= -1;
        } else {
            materialProperties = {
                color: "hsl(320, 0%, 49%)",
            };
        }
        let material = new THREE.MeshBasicMaterial(materialProperties);
        const bar = new THREE.Mesh(geometry, material);
        bar.position.y += y_dist/2;
        bar.position.z += zigzag;
        if(i != 0)
        {
            bar.position.x += i * (x_dist + x_spacing);
        }
        
        veto_wall.add(bar);
    
    }
    veto_wall.position.x -= x_dist/2;
    scene.add(veto_wall);
}

create_veto_wall(scene, veto_wall, 23, 9.398, 227.2362, 1.0008, .5, .5); //X_SPACING AND Z_SPACING NOT CORRECT

// let bar_num = 23;
// let x_dist = 9.398;
// let y_dist = 227.2362;
// let z_dist = 1.0008;
// let x_spacing = .5; //NOT CORRECT
// let z_spacing = .5; //NOT CORRECT



// const geometry = new THREE.BoxGeometry(x_dist, y_dist, z_dist);
// let materialProperties = {color: "hsl(320, 0%, 79%)",};
// let material = new THREE.MeshBasicMaterial(materialProperties);
// const bar = new THREE.Mesh(geometry, material);
// bar.position.y += y_dist/2;
// scene.add(bar);

const axesHelper = new THREE.AxesHelper( 600 );
scene.add( axesHelper );

camera.position.set(200, 200, 200);
camera.lookAt(0, 0, 0);
controls.update();

function animate() {
    requestAnimationFrame(animate);
    renderer.render(scene, camera);
};

animate();


