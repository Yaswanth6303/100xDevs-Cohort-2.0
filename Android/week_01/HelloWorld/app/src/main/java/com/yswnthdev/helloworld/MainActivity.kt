package com.yswnthdev.helloworld

import android.os.Bundle
import android.widget.Button
import android.widget.EditText
import androidx.activity.enableEdgeToEdge
import androidx.appcompat.app.AlertDialog
import androidx.appcompat.app.AppCompatActivity

class MainActivity : AppCompatActivity() {
    override fun onCreate(savedInstanceState: Bundle?) {
        super.onCreate(savedInstanceState)
        enableEdgeToEdge()
        setContentView(R.layout.activity_main)

        val usernameInput = findViewById<EditText>(R.id.usernameInput)
        val passwordInput = findViewById<EditText>(R.id.passwordInput)
        val submitBtn = findViewById<Button>(R.id.submitBtn)

        submitBtn.setOnClickListener {
            AlertDialog.Builder(this)
                .setTitle("Welcome")
                .setMessage("Welcome to the app")
                .setPositiveButton("OK") { _, _ ->
                    usernameInput.text.clear()
                    passwordInput.text.clear()
                }
                .setCancelable(false)
                .show()
        }
    }
}