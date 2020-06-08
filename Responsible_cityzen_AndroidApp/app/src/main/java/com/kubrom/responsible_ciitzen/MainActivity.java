package com.kubrom.responsible_ciitzen;

import androidx.annotation.NonNull;
import androidx.annotation.RequiresApi;
import androidx.appcompat.app.AppCompatActivity;
import androidx.core.app.ActivityCompat;
import androidx.core.content.ContextCompat;
import android.content.pm.PackageManager;
import android.location.Location;
import android.os.Build;
import android.os.Bundle;
import android.app.ProgressDialog;
import android.content.ContentResolver;
import android.content.Intent;
import android.graphics.Bitmap;
import android.net.Uri;
import android.os.Environment;
import android.os.StrictMode;
import android.provider.MediaStore;
import android.util.Log;
import android.view.View;
import android.webkit.MimeTypeMap;
import android.widget.AdapterView;
import android.widget.ArrayAdapter;
import android.widget.Button;
import android.widget.EditText;
import android.widget.ImageView;
import android.widget.Spinner;
import android.widget.Toast;
import com.google.android.gms.location.FusedLocationProviderClient;
import com.google.android.gms.location.LocationServices;
import com.google.android.gms.tasks.OnCompleteListener;
import com.google.android.gms.tasks.OnFailureListener;
import com.google.android.gms.tasks.OnSuccessListener;
import com.google.android.gms.tasks.Task;
import com.google.android.material.textfield.TextInputEditText;
import com.google.firebase.database.DatabaseReference;
import com.google.firebase.database.FirebaseDatabase;
import com.google.firebase.firestore.DocumentReference;
import com.google.firebase.firestore.FirebaseFirestore;
import com.google.firebase.storage.FirebaseStorage;
import com.google.firebase.storage.StorageReference;
import com.google.firebase.storage.UploadTask;
import java.io.File;
import java.io.IOException;
import java.time.LocalDateTime;
import java.time.format.DateTimeFormatter;
import java.util.HashMap;
import java.util.Map;

import static android.Manifest.permission.ACCESS_COARSE_LOCATION;
import static android.Manifest.permission.ACCESS_FINE_LOCATION;
import static android.Manifest.permission.CAMERA;
import static android.Manifest.permission.WRITE_EXTERNAL_STORAGE;


public class MainActivity extends AppCompatActivity {
    private static final String TAG = "UploadData";
    private Button btnBrowse, btnUpload, btnCamera;
    private EditText description;
    private TextInputEditText location, name, phoneNumber;
    private ImageView imgView;
    private Uri FilePathUri;
    private Spinner authoritySpinner;
    private StorageReference storageReference;
    private DatabaseReference databaseReference;
    private FirebaseFirestore firestoreDB;
    private final int Image_Request_Code = 7;
    private ProgressDialog progressDialog;
    private String chosenAuthority;
    private double latitude, longitude;
    //private static final String FINE_LOCATION = ACCESS_FINE_LOCATION;
    //private static final String COARSE_LOCATION = ACCESS_COARSE_LOCATION;
    private static final int LOCATION_PERMISSION_REQUEST_CODE = 1234;
    private Boolean mLocationPermissionsGranted = false;

    public static int index = 1000;
    public final String directory = Environment.getExternalStoragePublicDirectory(Environment.DIRECTORY_DCIM) + "/Camera/";


    @Override
    protected void onCreate(Bundle savedInstanceState) {
        super.onCreate(savedInstanceState);
        setContentView(R.layout.activity_main);
        Log.d(TAG, "ON CREATE: getting the devices current location");
        ActivityCompat.requestPermissions(this, new String[]{CAMERA, WRITE_EXTERNAL_STORAGE,ACCESS_COARSE_LOCATION,ACCESS_FINE_LOCATION}, PackageManager.PERMISSION_GRANTED);

        StrictMode.VmPolicy.Builder builder = new StrictMode.VmPolicy.Builder();
        StrictMode.setVmPolicy(builder.build());

        storageReference = FirebaseStorage.getInstance().getReference("Images");
        databaseReference = FirebaseDatabase.getInstance().getReference("Images");
        firestoreDB = FirebaseFirestore.getInstance();
        btnBrowse = findViewById(R.id.btnbrowse);
        btnUpload = findViewById(R.id.btnupload);
        btnCamera = findViewById(R.id.btnCamera);
        description = findViewById(R.id.description);
        location = findViewById(R.id.location);
        name = findViewById(R.id.name);
        phoneNumber = findViewById(R.id.phoneNumber);
        imgView = findViewById(R.id.image_view);
        authoritySpinner = findViewById(R.id.authority);
        progressDialog = new ProgressDialog(MainActivity.this);// context name as per your project name

        String[] items = new String[]{"Police", "Library", "Skatteverket", "Kommun"};

        ArrayAdapter<String> adapter = new ArrayAdapter<String>(this,
                android.R.layout.simple_spinner_item, items);
        authoritySpinner.setAdapter(adapter);

        authoritySpinner.setOnItemSelectedListener(new AdapterView.OnItemSelectedListener() {
            @Override
            public void onItemSelected(AdapterView<?> parent, View view, int position, long id) {
                chosenAuthority = (String) parent.getItemAtPosition(position);
            }

            @Override
            public void onNothingSelected(AdapterView<?> parent) {

            }
        });


        btnBrowse.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {
                Intent intent = new Intent();
                intent.setType("image/*");
                intent.setAction(Intent.ACTION_GET_CONTENT);
                startActivityForResult(Intent.createChooser(intent, "Select Image"), Image_Request_Code);

            }
        });
        btnUpload.setOnClickListener(new View.OnClickListener() {
            @Override
            public void onClick(View view) {


                UploadImage();

            }
        });
    }


    @Override
    protected void onActivityResult(int requestCode, int resultCode, Intent data) {

        super.onActivityResult(requestCode, resultCode, data);

        if (requestCode == Image_Request_Code && resultCode == RESULT_OK && data != null && data.getData() != null) {

            FilePathUri = data.getData();

            try {
                Bitmap bitmap = MediaStore.Images.Media.getBitmap(getContentResolver(), FilePathUri);
                imgView.setImageBitmap(bitmap);
            } catch (IOException e) {

                e.printStackTrace();
            }
        }
    }


    public String GetFileExtension(Uri uri) {

        ContentResolver contentResolver = getContentResolver();
        MimeTypeMap mimeTypeMap = MimeTypeMap.getSingleton();
        return mimeTypeMap.getExtensionFromMimeType(contentResolver.getType(uri));

    }


    public void UploadImage() {
        getDeviceLocation();

        if (FilePathUri != null) {

            progressDialog.setTitle("Image is Uploading...");
            progressDialog.show();
            final StorageReference storageReference2 = storageReference.child(System.currentTimeMillis() + "." + GetFileExtension(FilePathUri));
            storageReference2.putFile(FilePathUri)
                    .addOnSuccessListener(new OnSuccessListener<UploadTask.TaskSnapshot>() {
                        @RequiresApi(api = Build.VERSION_CODES.O)
                        @Override
                        public void onSuccess(UploadTask.TaskSnapshot taskSnapshot) {

                            String _description = description.getText().toString().trim();
                            String _location = location.getText().toString().trim();
                            String _phoneNumber = phoneNumber.getText().toString().trim();
                            String _name = name.getText().toString().trim();
                            progressDialog.dismiss();
                            Toast.makeText(getApplicationContext(), "Image Uploaded Successfully ", Toast.LENGTH_LONG).show();

                            // Create a new user with a first, middle, and last name
                            UploadInfo imageUploadInfo = new UploadInfo(_name, _phoneNumber, _location, latitude, longitude, _description, chosenAuthority, taskSnapshot.getUploadSessionUri().toString(), currentDateTime());

                            // Add a new document with a generated ID
                            firestoreDB.collection("Images")
                                    .add(imageUploadInfo)
                                    .addOnSuccessListener(new OnSuccessListener<DocumentReference>() {
                                        @Override
                                        public void onSuccess(DocumentReference documentReference) {
                                            Log.d(TAG, "DocumentSnapshot added with ID: " + documentReference.getId());
                                        }
                                    })
                                    .addOnFailureListener(new OnFailureListener() {
                                        @Override
                                        public void onFailure(@NonNull Exception e) {
                                            Log.w(TAG, "Error adding document", e);
                                        }
                                    });
                            System.out.println(imageUploadInfo.toString());
                            //String ImageUploadId = databaseReference.push().getKey();
                            //databaseReference.child(ImageUploadId).setValue(imageUploadInfo);
                        }
                    });
        } else {

            Toast.makeText(MainActivity.this, "Please Select Image or Add Image Name", Toast.LENGTH_LONG).show();

        }
    }

    public void CameraButton(View view) {

        index++;
        String file = directory + index + ".jpg";
        File newFile = new File(file);

        try {
            newFile.createNewFile();
        } catch (IOException e) {
            e.printStackTrace();
        }

        Uri outputFileUri = Uri.fromFile(newFile);
        Intent cameraIntent = new Intent(MediaStore.ACTION_IMAGE_CAPTURE);

        cameraIntent.putExtra(MediaStore.EXTRA_OUTPUT, outputFileUri);
        startActivity(cameraIntent);
    }

    private void getDeviceLocation() {
        Log.d(TAG, "getDeviceLocation: getting the devices current location");
        getLocationPermission();

        FusedLocationProviderClient mFusedLocationProviderClient = LocationServices.getFusedLocationProviderClient(this);
        System.out.println("*********************PERMISSION:" + mLocationPermissionsGranted);
        try {
            if (mLocationPermissionsGranted) {
                final Task location = mFusedLocationProviderClient.getLastLocation();
                location.addOnCompleteListener(new OnCompleteListener() {
                    @Override
                    public void onComplete(@NonNull Task task) {
                        if(task.isSuccessful()){
                            Log.d(TAG, "onComplete: found location!");
                            Location currentLocation = (Location) task.getResult();
                            longitude = currentLocation.getLongitude();
                            latitude = currentLocation.getLatitude();
                            System.out.println(currentLocation.getLatitude() +"   "+currentLocation.getLongitude());
                        }else{
                            Log.d(TAG, "onComplete: current location is null");
                            Toast.makeText(MainActivity.this, "unable to get current location", Toast.LENGTH_SHORT).show();
                        }
                    }
                });
            }
       }catch (SecurityException e){
            Log.e(TAG, "getDeviceLocation: SecurityException: " + e.getMessage() );
        }
    }

    private void getLocationPermission() {
        Log.d(TAG, "getLocationPermission: getting location permission");

        String[] permissions = {
                ACCESS_FINE_LOCATION,
                ACCESS_COARSE_LOCATION
        };
        if (ContextCompat.checkSelfPermission(this,
                ACCESS_FINE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
            if (ContextCompat.checkSelfPermission(this,
                    ACCESS_COARSE_LOCATION) == PackageManager.PERMISSION_GRANTED) {
                mLocationPermissionsGranted = true;
            } else {
                try {
                    ActivityCompat.requestPermissions(this, permissions,
                            LOCATION_PERMISSION_REQUEST_CODE);
                } catch (Exception e) {
                    e.printStackTrace();
                }
            }
        }else {

            ActivityCompat.requestPermissions(this, permissions,
                    LOCATION_PERMISSION_REQUEST_CODE);
        }

    }

    @RequiresApi(api = Build.VERSION_CODES.O)
    private String currentDateTime(){
        LocalDateTime myDateObj = LocalDateTime.now();
        DateTimeFormatter myFormatObj = DateTimeFormatter.ofPattern("dd-MM-yyyy HH:mm:ss");
        return myDateObj.format(myFormatObj);
    }


}
